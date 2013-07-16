var youtubeListHanlder = {};

youtubeListHanlder._playlist = {};

youtubeListHanlder.getItemsList = function(){
	return youtubeListData.data.items;
};

youtubeListHanlder.getItem = function(id){
	var item = null;
	for(var i=0;i<youtubeListData.data.items.length;i++){
		if(youtubeListData.data.items[i].id == id){
			item = youtubeListData.data.items[i];
			break; 
		}
	};
	return item;
};

youtubeListHanlder.getYoutubeListItemTemplate = function(item){
	var itemTemplate="";
	itemTemplate += "            <li>";
	itemTemplate += "              <div>";
	itemTemplate += "                <strong>";
	itemTemplate += 					item.title;
	itemTemplate += "                <\/strong>";
	itemTemplate += "              <\/div>";
	itemTemplate += "              <div>";
	itemTemplate += "                <img src=\"" + item.thumbnail.hqDefault + "\" \/>";
	itemTemplate += "              <\/div>";
	itemTemplate += "              <br/>";	
	itemTemplate += "              <input type=\"button\" value=\"Add\" class=\"btn\" onclick=\"youtubeListHanlder.addToPlaylist('" + item.id +"')\" \/>";
	itemTemplate += "            <\/li>";


	return itemTemplate;
};

youtubeListHanlder.getPlaylistItemTemplate = function(item){
	var itemTemplate="";
	itemTemplate += "          <li id=\"playlist-item-" + item.id + "\">";
	itemTemplate += "            <div>";
	itemTemplate += "              <strong>";
	itemTemplate +=                 	item.title;
	itemTemplate += "              <\/strong>";
	itemTemplate += "            <\/div>";
	itemTemplate += "            <div>";
	itemTemplate += "              <img src=\"" + item.thumbnail.hqDefault + "\">";
	itemTemplate += "            <\/div>";
	itemTemplate += "            <div>";
	itemTemplate += "              <input type=\"button\" value=\"Play\" class=\"btn\" onclick=\"youtubeListHanlder.play('" + item.id +"')\"\/>";
	itemTemplate += "              <input type=\"button\" value=\"Remove\" class=\"btn btn-danger\" onclick=\"youtubeListHanlder.removeFromPlaylist('" + item.id +"')\"\/>";
	itemTemplate += "            <\/div>";
	itemTemplate += "          <\/li>";

	return itemTemplate;
};

youtubeListHanlder.getPlayerTemplate = function(item){
	var videoPlayerTemplate="";
	videoPlayerTemplate += "<iframe id=\"videoPlayeriframe\" width=\"420\" height=\"315\" src='//www.youtube.com/embed/" + item.id +"' frameborder=\"0\" allowfullscreen><\/iframe>";
	return videoPlayerTemplate
};

youtubeListHanlder.savePlaylist = function(playlist, callback){
	localStorage.setItem("playlist",JSON.stringify(playlist));
	callback(playlist);
};

youtubeListHanlder.getPlaylist = function(){
	return JSON.parse(localStorage.getItem("playlist"));
};

youtubeListHanlder.addToPlaylist = function(id){
	var item = youtubeListHanlder.getItem(id), $item = null;
	if(youtubeListHanlder._playlist[id] == void(0) || youtubeListHanlder._playlist[id] == null){
		var $item = $(youtubeListHanlder.getPlaylistItemTemplate(item));
		youtubeListHanlder._playlist[id] = item;
		youtubeListHanlder.savePlaylist(youtubeListHanlder._playlist, function(){
			$('#playlist').append($item);
		});		
	}else{
		console.log('item is already in the list');
	};
};

youtubeListHanlder.removeFromPlaylist = function(id){
	var item = youtubeListHanlder.getItem(id);
	delete youtubeListHanlder._playlist[id];
	youtubeListHanlder.savePlaylist(youtubeListHanlder._playlist, function(){
		$('#playlist-item-' + id).remove();
	});		
};

youtubeListHanlder.addItemToYoutubeList = function(item){
	var itemTemplate = youtubeListHanlder.getYoutubeListItemTemplate(item);
	$('#youtube-list').append(itemTemplate);	
};

youtubeListHanlder.play = function(id){
	var item = youtubeListHanlder.getItem(id);
	$('#video-player').html(youtubeListHanlder.getPlayerTemplate(item));
};

youtubeListHanlder.remove = function(id){
	var item = youtubeListHanlder.getItem(id);
};

youtubeListHanlder.init = function(){
	
	// generate youtube list
	$.each(youtubeListData.data.items, function(index, item){
		youtubeListHanlder.addItemToYoutubeList(item);
	});

	// generate playlist list
	$.each(youtubeListHanlder.getPlaylist(), function(index, item){
		youtubeListHanlder.addToPlaylist(item.id);
	})	
};

$(function(){
	youtubeListHanlder.init();
});