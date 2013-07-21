(function(){
'use strict';

var hpApp = angular.module('hpApp',['ngResource']);

hpApp.controller('youtube-playlist', function($scope, $resource){
  var videoResource = $resource('youtube/videos/',{}); 
  $scope.videoList = []; 
  $scope.playlist = JSON.parse(localStorage.getItem("playlist"));
  $scope.selectedVideo = null;

  function _updateLocalStorage(){
    localStorage.setItem("playlist",JSON.stringify($scope.playlist));
  }
  
  $scope.addToPlaylist = function(index){
    var video = $scope.videoList[index];
    if($scope.playlist.indexOf(video) == -1){
      $scope.playlist.push(video);
      _updateLocalStorage();
    }
  };

  $scope.removeFromPlaylist = function(index){
    $scope.playlist.splice(index,1);
    _updateLocalStorage();
  };

  $scope.selectVideo = function(index){
    $scope.selectedVideo = $scope.videoList[index];
  };
  
  $scope.search = function(){
    videoResource.query({query: $scope.searchStr}).$then(function(response){
      $scope.videoList = response.data.data.items;
    });
  };

});

}());


