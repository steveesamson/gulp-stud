var gulp = require('gulp');
var stud = require('./');

gulp.task('default', function(){
    gulp.src('./test-templates/**/*.html')
        .pipe(stud())
        .pipe(gulp.dest('./compiled'));
});