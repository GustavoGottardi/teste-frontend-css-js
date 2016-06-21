(function(){
    var html5elmeents = "address|article|aside|audio|canvas|content|command|datalist|details|dialog|figure|figcaption|footer|header|hgroup|keygen|main|mark|meter|menu|nav|progress|ruby|section|time|video".split('|');
	for(var i = 0; i < html5elmeents.length; i++){
		document.createElement(html5elmeents[i]);
	}
}
)();