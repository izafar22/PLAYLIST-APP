(function(){

var playCtrl=function($scope, $state, $stateParams, httpFactory,$interval){

var getList=function(){
  httpFactory.getPlaylist()
.then(function(res){
  $scope.lists=res.data.result;
},function(err){
  console.log(err);
});
};

$interval(getList,1000);


  $scope.delete=function(video){
  	
    var vobj={"url":video};
       	httpFactory.deleteSong(vobj)
  	.then(function(res){
      if(res.data.result
        ==="No Song to Play"){
        $scope.name=true;
        console.log('--nghide activated--',name);
      }
  		console.log('----deleted-play-----',res.data.result);
  	},function(err){
  		console.log(err);
  	});
  
  };

  $scope.submit = function(){
        console.log($scope.musicUrl);

            if($scope.musicUrl.slice(0,32)==="https://www.youtube.com/watch?v=")
{
            httpFactory.addSong({'url':$scope.musicUrl})
        .then(function(res){
            console.log('----submit------',res.data.result);
            $scope.musicUrl="";
        },function(err){
           console.log(err);
        });
    }
    else
      {return;}
    };



};
    playCtrl.$inject=['$scope', '$state', '$stateParams', 'httpFactory','$interval'];
    angular.module('playApp')
    .controller('playCtrl',playCtrl);
})();