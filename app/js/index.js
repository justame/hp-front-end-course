var youtubeListHanlder = {};

youtubeListHanlder._playlist = {};

youtubeListHanlder.getItemsList = function(){
	return window.youtubeListData.data.items; // "window.youtubeListData" variable was created at the file "js/staticData.js"
};

youtubeListHanlder.getItem = function(id){
	var item = null;
	for(var i=0;i<youtubeListData.data.items.length;i++){
		if(youtubeListData.data.items[i].id == id){
			item = youtubeListData.data.items[i];
			break;
		}
	}
	return item;
};

// to convert html to javascript you can use this convertor - http://accessify.com/tools-and-wizards/developer-tools/html-javascript-convertor/
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

// to convert html to javascript you can use this convertor - http://accessify.com/tools-and-wizards/developer-tools/html-javascript-convertor/
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
	itemTemplate += "              <input type=\"button\" value=\"Select\" class=\"btn\" onclick=\"youtubeListHanlder.selectVideo('" + item.id +"')\"\/>";
	itemTemplate += "              <input type=\"button\" value=\"Remove\" class=\"btn btn-danger\" onclick=\"youtubeListHanlder.removeFromPlaylist('" + item.id +"')\"\/>";
	itemTemplate += "            <\/div>";
	itemTemplate += "          <\/li>";

	return itemTemplate;
};

youtubeListHanlder.getPlayerTemplate = function(item){
	var videoPlayerTemplate="";
	videoPlayerTemplate += "<iframe id=\"videoPlayeriframe\" width=\"420\" height=\"315\" src='//www.youtube.com/embed/" + item.id +"' frameborder=\"0\" allowfullscreen><\/iframe>";
	return videoPlayerTemplate;
};

youtubeListHanlder.savePlaylist = function(playlist, callback){
	localStorage.setItem("playlist",JSON.stringify(playlist)); // JSON.stringify convert javascript object and convert it to string
	callback(playlist);
};

youtubeListHanlder.getPlaylist = function(){
	return JSON.parse(localStorage.getItem("playlist")); // JSON.parse convert JSON string into javascript object
};

youtubeListHanlder.addToPlaylist = function(id){
	var item = youtubeListHanlder.getItem(id), $item = null;
	if(youtubeListHanlder._playlist[id] === undefined || youtubeListHanlder._playlist[id] === null){
		$item = $(youtubeListHanlder.getPlaylistItemTemplate(item));
		youtubeListHanlder._playlist[id] = item;
		youtubeListHanlder.savePlaylist(youtubeListHanlder._playlist, function(){
			$('#playlist').append($item); // http://api.jquery.com/append/
		});
	}else{
		console.log('item is already in the list');
	}
};

youtubeListHanlder.removeFromPlaylist = function(id){
	var item = youtubeListHanlder.getItem(id);
	delete youtubeListHanlder._playlist[id];
	youtubeListHanlder.savePlaylist(youtubeListHanlder._playlist, function(){
		$('#playlist-item-' + id).remove(); // http://api.jquery.com/remove/
	});
};

youtubeListHanlder.addItemToYoutubeList = function(item){
	var itemTemplate = youtubeListHanlder.getYoutubeListItemTemplate(item);
	$('#youtube-list').append(itemTemplate);
};

youtubeListHanlder.selectVideo = function(id){
	var item = youtubeListHanlder.getItem(id);
	$('#video-player').html(youtubeListHanlder.getPlayerTemplate(item));
};

youtubeListHanlder.remove = function(id){
	var item = youtubeListHanlder.getItem(id);
};

youtubeListHanlder.filterVideos = function(filterStr){
	var items = youtubeListHanlder.getItemsList();
	var filterdList = [];
	
	youtubeListHanlder.clearYoutubeList();
	
	$.each(items, function(index, item){ // http://api.jquery.com/jQuery.each/
		if(item.title.toLowerCase().indexOf(filterStr.toLowerCase()) > -1){
			filterdList.push(item)
		}
	});
	
	$.each(filterdList, function(index, item){
		youtubeListHanlder.addItemToYoutubeList(item);
	});

	return filterdList;
};

youtubeListHanlder.clearYoutubeList = function(){
	$('#youtube-list').html(''); // http://api.jquery.com/html/
};

youtubeListHanlder.init = function(){
	// generate youtube list (left column)
	youtubeListHanlder.clearYoutubeList();
	$.each(youtubeListHanlder.getItemsList(), function(index, item){
		youtubeListHanlder.addItemToYoutubeList(item);
	});

	// generate playlist list
	$.each(youtubeListHanlder.getPlaylist(), function(index, item){
		youtubeListHanlder.addToPlaylist(item.id);
	});
};


// waiting for dom to b ready and execute the init function
$(function(){
	youtubeListHanlder.init();
});