var youtubeListHanlder = {};

youtubeListHanlder._playlist = {};
youtubeListHanlder._videoList = [];

youtubeListHanlder.fetchItemsList = function(searchQuery, callback){
	if(searchQuery.length > 0){
		$.ajax('youtube/videos',{
			type: 'GET',
			dataType : 'json',
			data:{
				q: searchQuery
			}
		}).done(function(data){
			callback(data.data.items);
		});
	}else{
		callback({});
	}
};

youtubeListHanlder.getItem = function(id){
	var item = null;
	for(var i=0;i< youtubeListHanlder._videoList.length;i++){
		if(youtubeListHanlder._videoList[i].id == id){
			item = youtubeListHanlder._videoList[i];
			break;
		}
	}
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
	itemTemplate += "              <input type=\"button\" value=\"Add\" class=\"btn\" onclick=\"youtubeListHanlder.addToPlaylistByItemId('" + item.id +"')\" \/>";
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
	localStorage.setItem("playlist",JSON.stringify(playlist));
	callback(playlist);
};

youtubeListHanlder.getPlaylist = function(){
	return JSON.parse(localStorage.getItem("playlist"));
};

youtubeListHanlder.addToPlaylistByItemId = function(id){
	var item = youtubeListHanlder.getItem(id);
	youtubeListHanlder.addToPlaylist(item);
};

youtubeListHanlder.addToPlaylist = function(item){
	var $item = null;
	if(youtubeListHanlder._playlist[item.id] === undefined || youtubeListHanlder._playlist[item.id] === null){
		$item = $(youtubeListHanlder.getPlaylistItemTemplate(item));
		youtubeListHanlder._playlist[item.id] = item;
		youtubeListHanlder.savePlaylist(youtubeListHanlder._playlist, function(){
			$('#playlist').append($item);
		});
	}else{
		console.log('item is already in the list');
	}
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

youtubeListHanlder.selectVideo = function(id){
	var item = youtubeListHanlder.getItem(id);
	$('#video-player').html(youtubeListHanlder.getPlayerTemplate(item));
};

youtubeListHanlder.remove = function(id){
	var item = youtubeListHanlder.getItem(id);
};

youtubeListHanlder.filterVideos = function(filterStr){
	var items = youtubeListHanlder._videoList;
	var filterdList = [];
	
	youtubeListHanlder.clearYoutubeList();
	
	$.each(items, function(index, item){
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
	$('#youtube-list').html('');
};

youtubeListHanlder.init = function(){
	// generate youtube list
	youtubeListHanlder.clearYoutubeList();
	
	youtubeListHanlder.fetchItemsList('dbz', function(items){
		youtubeListHanlder._videoList = items;

		$.each(youtubeListHanlder._videoList, function(index, item){
			youtubeListHanlder.addItemToYoutubeList(item);
		});
	});

	// generate playlist list
	$.each(youtubeListHanlder.getPlaylist(), function(index, item){
		youtubeListHanlder.addToPlaylist(item);
	});
};



$(function(){
	youtubeListHanlder.init();
});