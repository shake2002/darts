module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		watch: {
			scripts: {
				files: ['js/*.js', 'html/partials/*.html', 'css/*.css', '*.html'],
				tasks: [],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.registerTask('default', ['watch']);

};