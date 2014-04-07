var gulp = require('gulp'),
  refresh = require('gulp-livereload'),
  lrserver = require('tiny-lr')(),
  express = require('express'),
  watch = require('gulp-watch'),
  livereload = require('connect-livereload'),
  dbservice = require('./datasource/db-service.js'),
  livereloadport = 35729,
  serverport = 8000;

var ROOT = __dirname + './../app';


//We only configure the server here and start it only when running the watch task
var server = express();
//Add livereload middleware before static-middleware
server.use(livereload({
  port: livereloadport
}));
server.use(express.static(ROOT));
server.use(express.logger());
server.use(express.bodyParser());


var fullPath = function(input) {
  for (var i = 0; i < input.length; i++) {
    input[i] = ROOT + input[i];
  }
  return input;
};

var pathsArray = ['/*.html', '/html/partials/*.html', '/js/*.js', '/css/*.css'];

gulp.task('reload', function() {
  gulp.src(fullPath(pathsArray), {
    read: false
  })
    .pipe(watch({
      emit: 'one'
    })).pipe(refresh(lrserver));
});


gulp.task('serve', function() {
  if (dbservice.init)
    dbservice.init(server);
  //Set up your static fileserver, which serves files in the build dir
  server.listen(serverport);

  //Set up your livereload server
  lrserver.listen(livereloadport);
});


gulp.task('default', function() {
  gulp.run('serve', 'reload');
});