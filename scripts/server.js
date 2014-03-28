var express = require('express'),
	fileSystem = require('fs'),
	path = require('path'),
	accessLogFile = fileSystem.createWriteStream('./access.log', {
		flags: 'a'
	});

var services = [
	'db-service'
];
var app = express(),
	registerService = function (app) {
		console.log('Register service START');
		for (var i = 0; i < services.length; i++) {
			var service = require('./datasource/' + services[i] + '.js');
			console.log(service);
			if (service.init)
				service.init(app);
		}
		console.log('Register service END');
	};

var DEFAULT_PORT = 8000;
var port = parseInt(process.argv[2]) || DEFAULT_PORT;


app.use(express.logger({
	stream: accessLogFile
}));

registerService(app);

app.listen(port);
console.log('Listening on port: ' + port);