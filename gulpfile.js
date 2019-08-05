var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var less = require('gulp-less')
var cssClean = require('gulp-clean-css')
var htmlMin = require('gulp-htmlmin')
var livereload = require('gulp-livereload')
var connect = require('gulp-connect')
var imagemin = require('gulp-imagemin')
var open = require('open')
var babel = require('gulp-babel')
var clean = require('gulp-clean')
// var $ = require('gulp-load-plugins')

// 注册任务
// gulp.task('任务名', ['前置任务名(可选参数)'], function () {
//     // 配置任务的操作
// })

// 合并压缩js文件
gulp.task('js', ['clean-dist'], function () {
  return gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('build.js')) // 临时合并文件
    .pipe(gulp.dest('dist/js/')) // 临时输出文件到本地
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' })) // 重命名
    .pipe(gulp.dest('dist/js/'))
    .pipe(livereload())
    .pipe(connect.reload())
})

// 注册转换less的任务
gulp.task('less', ['clean-dist'], function () {
  return gulp.src('src/less/*.less')
    .pipe(less()) // 编译less文件为css文件
    .pipe(gulp.dest('src/css')) // 将less编译为css文件后存放到css文件夹中，等待后续统一合并
})

// 合并压缩css文件
gulp.task('css', ['less'], function () {
  return gulp.src('src/css/*.css')
    .pipe(concat('build.css'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssClean({ compatibility: 'ie8' })) // 压缩、设置兼容到ie8
    .pipe(gulp.dest('dist/css/'))
    .pipe(livereload())
    .pipe(connect.reload())
})

// 压缩html
gulp.task('html', ['clean-dist'], function () {
  return gulp.src('index.html')
    .pipe(htmlMin({ collapseWhitespace: true })) // 压缩html
    .pipe(gulp.dest('dist/')) // 输出
    .pipe(livereload())
    .pipe(connect.reload())
})

// 压缩图片
gulp.task('images', ['clean-dist'], function () {
  return gulp.src('src/images/*.*')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('dist/images/'))
    .pipe(livereload())
    .pipe(connect.reload())
})


// 注册监视任务（全自动）
gulp.task('server', ['default'], function () {
  // 配置服务器选项
  connect.server({
    root: 'dist/',
    livereload: true, // 实时刷新
    port: 5000
  })
  // 确认监听的目标以及绑定相应的任务
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch(['src/css/*.css', 'src/less/*.less'], ['css']);
  gulp.watch(['*.html'], ['html']);
  gulp.watch('src/images/*.*', ['images']);
  // 打开浏览器
  open('http://localhost:5000')
})

// 清理dist文件
gulp.task('clean-dist', function () {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('default', ['js', 'css', 'images', 'html'])