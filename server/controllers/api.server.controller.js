

var playlist = [];


exports.addSong=function(req,res,next){
      //  console.log(req.body.url);
        if (playlist.indexOf(req.body.url) == -1) {
    playlist.push(req.body.url);
                                 }



	res.json({"error":0,"errorMsg":"Registered success.", "result": playlist});

};


exports.getPlaylist = function(req,res){
	if(playlist.length > 0)
{

	res.json({"error":0,"errorMsg":"Registered success.", "result": playlist});
}
else
{
	var str="No Song to Play";
 res.json({"error":0,"errorMsg":"Registered success.", "result": str});
}

};

exports.deleteSong=function(req,res){
	//console.log(req.body.url);
	if(playlist.indexOf(req.body.url)!=-1)
	{
		var index=playlist.indexOf(req.body.url);
		var deleted=playlist.splice(index,1);
	     console.log('---song deleted----',deleted);
	   if(playlist.length > 0)
	{
		res.json({"error":0,"errorMsg":"Registered success.", "result": playlist});
    }
 else
 {
 	var str="No Song to Play";
 	//console.log(str);
 	res.json({"error":0,"errorMsg":"Registered success.", "result": str});
 }

	}
};
