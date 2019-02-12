var gulp = require('gulp');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
    return gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript({
            noImplicitAny: true,
            outFile: 'glimmerstrands.js'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(rename('glimmerstrands.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest('dist'))
});
