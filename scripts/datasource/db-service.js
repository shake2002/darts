var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
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
		console.log('add player server post: request:' + request + ', response:' + response);
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
	console.log('retriveInitData: result: ' + result + ' callback:' + callback);
	Players.getPlayers(myDb, function(data) {
		console.log('result data PLAYER: (' + data.length + ') ' + data);
		result.players = data.players;
	});
	Games.getGames(myDb, function(data) {
		console.log('result data GAME: ' + data);
		result.games = data.games;
		callback(result);
	});
};