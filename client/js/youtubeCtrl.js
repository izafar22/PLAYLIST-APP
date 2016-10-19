(function(){

    var youtubeCtrl=function($scope,youtubeEmbedUtils,httpFactory,$interval){
    var tracker=1;
    $scope.theBestVideo=httpFactory.getFirstSong();
     var lists=[]; 
function init()
    {
        $interval(function(){ 
 httpFactory.getPlaylist()
 .then(function(res){
    lists=res.data.result.map(function(video){
        var index=video.indexOf("v=");
        console.log(index);
        var urlpath=video.slice(index+2);
        return urlpath; 
    });  
 console.log('---######urlpath----',lists);
 }); 
   },10000);
 
}
 init();
    
    $scope.playervars={
        controls:1,
        autoplay:1
    };

   
    $scope.$on('youtube.player.ended', function ($event, player) {
    console.log("hiiii");
    console.log('I am tracker',tracker);
    if(tracker < lists.length){
    console.log(tracker);
    $scope.theBestVideo=lists[tracker];
    tracker=tracker+1;
    console.log(tracker);
    //consol.lrog($scope.tracker);
    player.playVideo();
}
else{
    tracker=0;
    $scope.theBestVideo=lists[tracker];
    tracker++;
    player.playVideo();
}
  });

};
    
var youtubeVideo=function($window, youtubeEmbedUtils){

    var uniqId = 1;

    // from YT.PlayerState
    var stateNames = {
        '-1': 'unstarted',
        0: 'ended',
        1: 'playing',
        2: 'paused',
        3: 'buffering',
        5: 'queued'
    };

    var eventPrefix = 'youtube.player.';

    $window.YTConfig = {
        host: 'https://www.youtube.com'
    };

    return {
        restrict: 'EA',
        scope: {
            videoId: '=?',
            videoUrl: '=?',
            player: '=?',
            playerVars: '=?',
            playerHeight: '=?',
            playerWidth: '=?'
        },
        link: function (scope, element, attrs) {
            // allows us to $watch `ready`
            scope.utils = youtubeEmbedUtils;

            // player-id attr > id attr > directive-generated ID
            var playerId = attrs.playerId || element[0].id || 'unique-youtube-embed-id-' + uniqId++;
            element[0].id = playerId;

            // Attach to element
            scope.playerHeight = scope.playerHeight || 390;
            scope.playerWidth = scope.playerWidth || 640;
            scope.playerVars = scope.playerVars || {};

            // YT calls callbacks outside of digest cycle
            function applyBroadcast () {
                var args = Array.prototype.slice.call(arguments);
                scope.$apply(function () {
                    scope.$emit.apply(scope, args);
                });
            }

            function onPlayerStateChange (event) {
                var state = stateNames[event.data];
                if (typeof state !== 'undefined') {
                    applyBroadcast(eventPrefix + state, scope.player, event);
                }
                scope.$apply(function () {
                    scope.player.currentState = state;
                });
            }

            function onPlayerReady (event) {
                applyBroadcast(eventPrefix + 'ready', scope.player, event);
            }

            function onPlayerError (event) {
                applyBroadcast(eventPrefix + 'error', scope.player, event);
            }

            function createPlayer () {
                var playerVars = angular.copy(scope.playerVars);
                playerVars.start = playerVars.start || scope.urlStartTime;
                var player = new YT.Player(playerId, {
                    height: scope.playerHeight,
                    width: scope.playerWidth,
                    videoId: scope.videoId,
                    playerVars: playerVars,
                    events: {
                        onReady: onPlayerReady,
                        onStateChange: onPlayerStateChange,
                        onError: onPlayerError
                    }
                });

                player.id = playerId;
                return player;
            }

            function loadPlayer () {
                if (scope.videoId || scope.playerVars.list) {
                    if (scope.player && typeof scope.player.destroy === 'function') {
                        scope.player.destroy();
                    }

                    scope.player = createPlayer();
                }
            };

            var stopWatchingReady = scope.$watch(
                function () {
                    return scope.utils.ready
                        // Wait until one of them is defined...
                        && (typeof scope.videoUrl !== 'undefined'
                        ||  typeof scope.videoId !== 'undefined'
                        ||  typeof scope.playerVars.list !== 'undefined');
                },
                function (ready) {
                    if (ready) {
                        stopWatchingReady();

                        // URL takes first priority
                        if (typeof scope.videoUrl !== 'undefined') {
                            scope.$watch('videoUrl', function (url) {
                                scope.videoId = scope.utils.getIdFromURL(url);
                                scope.urlStartTime = scope.utils.getTimeFromURL(url);

                                loadPlayer();
                            });

                        // then, a video ID
                        } else if (typeof scope.videoId !== 'undefined') {
                            scope.$watch('videoId', function () {
                                scope.urlStartTime = null;
                                loadPlayer();
                            });

                        // finally, a list
                        } else {
                            scope.$watch('playerVars.list', function () {
                                scope.urlStartTime = null;
                                loadPlayer();
                            });
                        }
                    }
            });

            scope.$watchCollection(['playerHeight', 'playerWidth'], function() {
                if (scope.player) {
                    scope.player.setSize(scope.playerWidth, scope.playerHeight);
                }
            });

            scope.$on('$destroy', function () {
                scope.player && scope.player.destroy();
            });
        }
    };
//}]);
};
youtubeCtrl.$inject=['$scope','youtubeEmbedUtils','httpFactory','$interval'];
    youtubeVideo.$inject=['$window', 'youtubeEmbedUtils'];

    angular.module('playApp')
    .controller('youtubeCtrl',youtubeCtrl)
    .directive('youtubeVideo',youtubeVideo);
}());