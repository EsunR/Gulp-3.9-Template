var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


// 转化js
gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.concat('build.js')) // 临时合并文件
        .pipe(gulp.dest('dist/js/')) // 临时输出文件到本地
        .pipe($.uglify())
        .pipe($.rename({ suffix: '.min' })) // 重命名
        .pipe(gulp.dest('dist/js/'))
        .pipe($.livereload())
        .pipe($.connect.reload())
})

