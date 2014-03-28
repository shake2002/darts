var MongoClient = require('mongodb').MongoClient;
var Hello = require('./helloworld-mongo');
var myDb;


var connect = function () {
	console.log('connecting to database mongodb...');
	MongoClient.connect('mongodb://127.0.0.1:27017/darts', function (err, db) {
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

	server.get('/helloworld', function (request, response) {
		console.log("helloworld request");
		response.send("Hello world");
	});
	server.get('/data', function (request, response) {
		console.log("data request");
		Hello.hello(myDb, function (data) {
			response.send(data);
		});
	});
};