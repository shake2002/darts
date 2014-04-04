var ObjectId = require('mongodb').ObjectID;
var PLAYERS_TABLE_NAME = 'player';

exports.getPlayers = function(db, callback) {
	db.collection(PLAYERS_TABLE_NAME).find().sort({
		'name': 1
	}).toArray(function(err, array) {
		callback({
			'players': array
		});
	});
};
exports.addPlayer = function(db, data, callback) {
	console.dir(data);
	db.collection(PLAYERS_TABLE_NAME).insert(data, {
		safe: true
	}, function() {
		console.log('addplayer dbcallback start');
		callback();
		console.log('addplayer dbcallback end');
	});

	//	callback();

};

exports.removePlayer = function(db, data, callback) {
	db.collection(PLAYERS_TABLE_NAME).remove({
		"_id": ObjectId("" + data._id + "")
	}, function() {
		callback();
	});

};