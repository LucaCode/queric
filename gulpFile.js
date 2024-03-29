const gulp            = require('gulp');
const typescript      = require('gulp-typescript');
const tscConfig       = require('./tsconfig.json');
const OptimizeJs      = require('gulp-optimize-js');
const terser          = require('gulp-terser');

gulp.task('ts', function () {
    return gulp
        .src('src/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest('dist'));
});

gulp.task('cof', function() {
    return gulp
        .src(['src/**/*','!src/**/*.ts',])
        .pipe(gulp.dest('dist'));
});

gulp.task('optimize', function () {
    return gulp
        .src('dist/**/*.js')
        .pipe(OptimizeJs())
        .pipe(terser())
        .pipe(gulp.dest('dist'));
});

gulp.task('compile', gulp.series(gulp.parallel('cof','ts'),'optimize'));

gulp.task('watch', () =>
{
    gulp.watch('src/**/*.ts', gulp.parallel('ts'));
    gulp.watch(['src/**/*', '!src/**/*.ts'], gulp.parallel('cof'));
});

gulp.task('default', gulp.series('compile', 'watch'));
