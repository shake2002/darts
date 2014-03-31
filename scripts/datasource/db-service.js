var MongoClient = require('mongodb').MongoClient;
var Players = require('./players');
var myDb;
var mongoDbUrl = 'mongodb://127.0.0.1:27017/darts';

var connect = function () {
	console.log('connecting to database mongodb...on: ' + mongoDbUrl);
	MongoClient.connect(mongoDbUrl, function (err, db) {
		if (err) {
			console.log(err);
			return;
		} else
			console.log('connected to database mongodb');
		myDb = db;
	});
};

connect();

exports.init = function (server) {
	console.log("INIT:" + server);

	server.get('/player/list', function (request, response) {
		Players.getPlayers(myDb, function (data) {
			response.send(data);
		});
	});
	server.post('/player/add', function (request, response) {
		console.dir(request.body);
		Players.addPlayer(myDb, request.body, function () {
			Players.getPlayers(myDb, function (data) {
				response.send(data);
			});
		});
	});
};