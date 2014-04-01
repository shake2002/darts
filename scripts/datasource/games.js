var TABLE_NAME = 'game';

exports.getGames = function(db, callback) {
	db.collection(TABLE_NAME).find().sort({
		'name': 1
	}).toArray(function(err, array) {
		callback({
			'games': array
		});
	});
};
exports.newGame = function(db, data, callback) {
	console.log('add game:' + data);
	data.date = new Date();

	db.collection(TABLE_NAME).insert(data, {
		safe: true
	}, function() {
		console.log('addGame dbcallback');
	});

	callback();
};