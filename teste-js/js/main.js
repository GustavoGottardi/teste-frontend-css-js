//Função que verifica se o campo e-mail está preenchido corretamente
function verify_email(){
	var email = $('input[name="email"]').val();
	var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
	if (re.test(email)) {
		$('span.error').remove();
		return true;
	} else {
		$('span.error').remove();
		$('<span class="error">Insira um e-mail válido!</span>').appendTo('label[for=email]');
		return false;
	}
}

//Função que lista todos os campos do form na ul#saida
function callback(e){
	return e;
}
var checker_form = {
	method: function(callback){
		$('ul#saida span').remove();
		$('input, select, textarea').each(function(){
			var value = $(this).val();
			var attr = $(this).attr('name');
			$('ul#saida').append('<span>'+attr+' : '+value+'</span><br />');
		});

		if(typeof callback == "function")
        	callback();
	}
}

//Chamada da função verify_email quando é retirado o focus do campo email
$('input[name="email"]').blur(function () {
	verify_email();
});

//Chamada da função verify_email quando clica no botão Validar Informações e chamda da função checker_form
$('#valida').on('click', function(event){
	event.preventDefault();
	verify_email();
	if(verify_email()){
		checker_form.method(function(){
			$('a#enviar').addClass('active');
		});
	}
});

//Função que detecta se a página está sendo fechada ou atualizada, caso tenha 
window.addEventListener("beforeunload", function (e) {
	$('input, select, textarea').each(function(){
		var value = $(this).val();
		var attr = $(this).attr('name');
		if(value != ' ' && verify_email()){
			localStorage.setItem(attr, value);
		}
	});
	var confirmationMessage = "Tem certeza que deseja sair da página?";
	(e || window.event).returnValue = confirmationMessage;
  		return confirmationMessage;
});

//Função que preenche o formulário após o onload da página com base nos dados guadados no localStorage na sessão anterior
$(document).ready(function(){
	$('input, select, textarea').each(function(key, event){
		var value = $(this).val();
		var attr = $(this).attr('name');
		if(event.nodeName == 'INPUT' || event.nodeName == 'TEXTAREA'){
			var valueLocalStorage = localStorage.getItem(attr, value);
			$('[name="'+attr+'"]').val(valueLocalStorage);
		}
		if(event.nodeName == 'SELECT'){
			var valueLocalStorage = localStorage.getItem(attr, value).split(",").map(String);
			$(valueLocalStorage).each(function(key, data){
				var value_unique = data;
				$('select').find('option[value="'+value_unique+'"]').prop("selected", true);
			});
		}
	});
});

//Função que simula uma requisição ajax para o envio dos dados para o servidor
$('a#enviar').on('click', function(){
	var serializedData = $('form').serialize();
	$.ajax({
        url: "envia-dados.html",
        type: "POST",
        data: serializedData,
        beforeSend: function() {
			alert('Os dados do formulário estão sendo enviado!');
		},
        success: function (response) {
			alert('Formulário enviado com sucesso!');
        },
        error: function(jqXHR, textStatus, errorThrown) {
        	alert('Erro ao enviar o formulário!');
        }
    });
});