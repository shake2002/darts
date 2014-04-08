module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		watch: {
			scripts: {
				files: fullPath(grunt.file.readJSON('config.json').paths),
				tasks: [],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.registerTask('default', ['watch']);

};

var fullPath = function(input) {
	console.log(input);
	var result = [];
	for (var i = 0; i < input.length; i++) {
		console.log(input[i].path);
		result[i] = input[i].path;
	}
	return result;
};