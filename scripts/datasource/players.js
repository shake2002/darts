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
	console.log('add player:' + data);
	db.collection(PLAYERS_TABLE_NAME).insert(data, {
		safe: true
	}, function() {
		console.log('addplayer dbcallback');
	});

	callback();
};

exports.removePlayer = function(db, data, callback) {
	console.log('remove player:' + data._id);
	db.collection(PLAYERS_TABLE_NAME).remove({
		'_id': data._id
	}, function() {
		console.log('remove player dbcallback');
	}, 1);
	callback();
};