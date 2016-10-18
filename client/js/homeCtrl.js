(function(){

var homeCtrl=function($scope,$state,httpFactory,$interval)
                   {
var count=0;
    console.log("homeCtrl loaded--");
    console.log($scope.songUrl);

    
    $scope.submit = function(){
        console.log($scope.songUrl);
        httpFactory.getPlaylist()
        .then(function(res){
           if(res.data.result==="No Song to Play"){
            console.log('firstSong set');
            httpFactory.setFirstSong($scope.songUrl);
           count++;
          }
            return httpFactory.addSong({'url':$scope.songUrl});
        })
        .then(function(res){
            console.log('----submit------',res.data.result);
         if(count>0)
      {
        $state.go('play');
      }
         else{
            $state.go('addSong');
         }
            
        });
    };
   
};
    
homeCtrl.$inject=['$scope','$state','httpFactory','$interval'];
 angular.module('playApp')
  .controller('homeCtrl',homeCtrl); 
})();

