exports.hello = function (db, callback) {
	db.collection('hello').find().toArray(function (err, array) {
		callback(array);
	});
};