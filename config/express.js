
var express = require('express');
var app = express();
//var http = require('http').Server(app);
var path = require('path');
var cors=require('cors');
var bodyParser = require('body-parser');

module.exports = function(){
	

	app.use(express.static(path.join(__dirname, '../views')));
	app.use(cors());
    app.use(bodyParser.json());
	
	
	require('../public/routes/api.server.routes')(app);
    
	
	return app;
	
}
