var connect = require('gulp-connect'),
    gulp = require('gulp'),
    zip = require('gulp-zip');
    // inlinesource = require('gulp-inline-source');

gulp.task('build', function() {
  return gulp.src('src/**/*.*')
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('./dist'));
  // return gulp.src('./src/*.html')
  //   .pipe(inlinesource())
  //   .pipe(gulp.dest('./dist/'));
});

gulp.task('connect', function() {
  connect.server({
    root: './src',
    livereload: true
  });
});

// gulp.task('watch', function() {
//   gulp.watch(['./src/**/*'], gulp.parallel('build'));
// });
 
gulp.task('default', gulp.parallel('connect'));
