var MongoClient = require('mongodb').MongoClient;
var Players = require('./players');
var Games = require('./games');
var myDb;
var mongoDbUrl = 'mongodb://127.0.0.1:27017/darts';

var connect = function() {
	console.log('connecting to database mongodb...on: ' + mongoDbUrl);
	MongoClient.connect(mongoDbUrl, function(err, db) {
		if (err) {
			console.log(err);
			return;
		} else
			console.log('connected to database mongodb');
		myDb = db;
	});
};

connect();

exports.init = function(server) {

	server.get('/init', function(request, response) {
		retreiveInitData(function(data) {
			response.send(data);
		});
	});

	server.get('/player/list', function(request, response) {
		retreiveInitData(function(data) {
			response.send(data);
		});
	});
	server.post('/player/add', function(request, response) {
		Players.addPlayer(myDb, request.body, function() {
			retreiveInitData(function(data) {
				response.send(data);
			});
		});
	});
	server.post('/player/remove', function(request, response) {
		Players.removePlayer(myDb, request.body, function() {
			retreiveInitData(function(data) {
				response.send(data);
			});
		});
	});

	server.post('/game/new', function(request, response) {
		Games.newGame(myDb, request.body, function() {
			retreiveInitData(function(data) {
				response.send(data);
			});
		});
	});
};
var retreiveInitData = function(callback) {
	var result = {
		players: [],
		games: []
	};
	Players.getPlayers(myDb, function(data) {
		result.players = data.players;
	});
	Games.getGames(myDb, function(data) {
		result.games = data.games;
		callback(result);
	});
};