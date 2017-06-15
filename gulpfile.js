var gulp = require('gulp'),
    watch = require('gulp-watch');
    sass = require('gulp-sass');
    babel = require('gulp-babel');
    del = require('del');
    uglify = require('gulp-uglify');

gulp.task("clean", function(){
  return del([
    'dist/js/**/*',
    'dist/*.html',
    'dist/css/**/*'
  ]);
});

gulp.task("sass", function(){
    return gulp.src('src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task("css", function(){
  return gulp.src("src/css/**/*.css")
  .pipe(gulp.dest("dist/css"));
});

gulp.task('sass:watch', function () {
  gulp.watch('src/css/**/*.scss', ['sass']);
});

gulp.task("stream-index", function(){
    return watch("src/index.html", { ignoreInitial: false })
    .pipe(gulp.dest("dist/"));
});

gulp.task("stream-js", function(){
    return watch('src/js/**/*.js', { ignoreInitial: false })
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task("default", ['clean', 'sass', 'sass:watch', 'css', 'stream-index', 'stream-js']);
