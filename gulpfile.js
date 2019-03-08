var connect = require('gulp-connect'),
    fs = require('fs'),
    gulp = require('gulp'),
    package = require('./package.json'),
    zip = require('gulp-zip'),
    xml2js = require('xml2js');

gulp.task('build', function() {
  return gulp.src('src/**/*.*')
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('generate', function(done) {
  fs.readFile('./src/imsmanifest.tmpl.xml', function(err, data) {
    var parser = new xml2js.Parser();
    parser.parseString(data, function (err, result) {
      if (err)  { console.error(err); }
      result.manifest.organizations[0].organization[0].title[0] = package.name;
      result.manifest.organizations[0].organization[0].item[0].title = package.description;
      result.manifest.resources[0] = {
        "resource": [{
          "$": {
            "identifier": "resource_1",
            "type": "webcontent",
            "adlcp:scormtype": "sco",
            "href": "index.html"
          },
          "file": [{
            "$": {
              "href": "index.html"
            }
          }, {
            "$": {
              "href": "css/index.css"
            }
          }, {
            "$": {
              "href": "js/index.js"
            }
          }]
        }]
      };
      var builder = new xml2js.Builder();
      var xml = builder.buildObject(result);
      fs.writeFile('./src/imsmanifest.xml', xml, (err) => {
        if (err)  { console.error(err); }
        done();
      });
    });
  });
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
 
gulp.task('default', gulp.parallel('connect', 'generate'));
