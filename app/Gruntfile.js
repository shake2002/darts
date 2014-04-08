module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		watch: {
			scripts: {
				files: grunt.file.readJSON('config.json').paths,
				tasks: [],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.registerTask('default', ['watch']);

};