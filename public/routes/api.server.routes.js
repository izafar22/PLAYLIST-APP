var api = require('../controllers/api.server.controller');
module.exports = function(app){
	app.get('/', function(req, res){
	  res.sendFile(__dirname + '/index.html');
	});

	

    app.route('/api/addSong')
       .post(api.addSong);


    app.route('/api/getPlaylist')
       .get(api.getPlaylist);

    app.route('/api/deleteSong')
     .post(api.deleteSong);



}