(function(){
'use strict';

var hpApp = angular.module('hpApp',['ngResource']);

hpApp.controller('youtube-playlist', function($scope, $resource){
  var videoResource = $resource('youtube/videos/',{}); 
  $scope.videoList = videoResource.query({query: 'dbz'}).$then(function(response){
    $scope.videoList = response.data.data.items;
  })

  $scope.playlist = [];

  $scope.selectedVideo = null;

  $scope.addToPlaylist = function(index){
    var video = $scope.videoList[index];
    if($scope.playlist.indexOf(video) == -1){
      $scope.playlist.push(video);
    };
  };

  $scope.removeFromPlaylist = function(index){
    $scope.playlist.splice(index,1);
  };

  $scope.selectVideo = function(index){
    $scope.selectedVideo = $scope.videoList[index];
  };



});

}());


