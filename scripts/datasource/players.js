var TABLE_NAME = 'player';

exports.getPlayers = function(db, callback) {
	console.log('getPlayers');
	db.collection(TABLE_NAME).find().sort({
		'name': 1
	}).toArray(function(err, array) {
		console.log('inside getPlayers:');
		callback({
			'players': array
		});
	});
};
exports.addPlayer = function(db, data, callback) {
	console.log('add player:' + data);
	db.collection(TABLE_NAME).insert(data, {
		safe: true
	}, function() {
		console.log('addplayer dbcallback');
	});

	callback();
};

exports.removePlayer = function(db, data, callback) {
	console.log('remove player:' + data);
	db.collection(TABLE_NAME).remove(data, function() {
		console.log('remove player dbcallback');
	});
	callback();
};