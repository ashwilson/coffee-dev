var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    uglify = require('gulp-uglify'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    debug = require('gulp-debug'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr(),

  source = 'src/components/',
  dest = 'builds/dev/';

 var jsSrc = [source+'scripts/testScript.js'];

gulp.task('html', function() {
    gulp.src('src/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(dest));
});

gulp.task('css', function() {
  gulp.src(source + 'sass/*')
  .pipe(postcss([
    autoprefixer(),
    colorfunctions()
  ]))
  .on('error', gutil.log)
  .pipe(gulp.dest(dest + 'css'));
});

gulp.task('js', function() {
    gulp.src(jsSrc)
        .pipe(debug({title: 'test'}))
        // .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(dest + 'js'));
});

gulp.task('watch', function() {
    var server = livereload();
    gulp.watch(jsSrc, ['js']);
    gulp.watch([dest+'js/script.js', dest + '*.hmtl'], function(e) {
        server.changed(e.path);
    });
});

gulp.task('webserver', function() {
  gulp.src(dest)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['js', 'watch']);
