const gulp = require('gulp')
const cssScss = require('gulp-css-scss')
const jsValidate = require('gulp-jsvalidate')
htmlv = require('gulp-html-validator');
gulp.task('css-scss', () => {
  return gulp.src('my-file.css')
    .pipe(cssScss())
    .pipe(gulp.dest('scss'))
},
gulp.task('default', ['css-scss']),

gulp.task('copy', function () { gulp.src('index.html').pipe(gulp.dest('assets')) }),
gulp.task('default', () =>
  gulp.src('cgolscript.js')
    .pipe(jsValidate())),

gulp.src('valid.html')
.pipe(htmlv())
.pipe(gulp.dest('./out')),
    // Option format set to html
    gulp.task('invalid', function () {
      gulp.src('invalid.html')
        .pipe(htmlv({format: 'html'}))
        .pipe(gulp.dest('./out'));
    })