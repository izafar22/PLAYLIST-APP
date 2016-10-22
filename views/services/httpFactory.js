(function(){
var httpFactory=function($http){
 	var firstSong="";
  var serverUrl = "http://127.0.0.1:9000/api/";
    return {
      setFirstSong:function(url){
         var index=url.indexOf("=");
         console.log(index);
        var urlpath=url.slice(index+1);
         firstSong=urlpath;
      },

      getFirstSong:function(){
        return firstSong;
      },
		
      addSong:function(songObj){
             
              var req={
              	method:"POST",
              	url: serverUrl + "addSong",
              	headers:{
              		'Content-Type': 'application/json'
              	},
              	data:songObj
              }
             console.log('addSong service getting loaded');
            
			return $http(req);
			
		},
		getPlaylist:function(){
             console.log("getPlaylist is getting called");
              var req={
              	method:"GET",
              	url: serverUrl + "getPlaylist",
              	headers:{
              		'Content-Type': 'application/json'
              	}
              };
     return $http(req);    
		},
		
    deleteSong:function(videoObj){
      var request={
                method:"POST",
                url: serverUrl + "deleteSong",
                headers:{
                  'Content-Type': 'application/json'
                },
                data:videoObj
              }
                  //console.log('deleted song----',videoObj);
              return $http(request);
    }
	}	
};
 httpFactory.$inject=['$http'];
    angular.module('playApp')
    .factory('httpFactory',httpFactory);
    
}());