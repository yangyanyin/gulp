'use strict';
var gulp = require('gulp'); 
var sass = require('gulp-sass');  // 编译sass 
var concat = require('gulp-concat'); // 合并
var cleanCSS = require('gulp-clean-css');  // 压缩css
var uglify = require('gulp-uglify');  //  压缩js
var imagemin = require('gulp-imagemin');  //  压缩image

//sass任务  编译多个scss文件合并到名字为index.min.css文件
gulp.task('mysass', function () {
  return gulp.src(['public/scss/index1.scss','public/scss/index3.scss'])  //  合并的css  
    .pipe(sass().on('error', sass.logError))  // 检查错误
    .pipe(concat('index.min.css')) // 合并后的文件名
    .pipe(cleanCSS())   // 压缩css
    .pipe(gulp.dest('src/css'));   // 合并和文件存放地址
});

gulp.task('myjs', function () {
  return gulp.src('public/js/*.js')  //  合并的js
    .pipe(concat('js.min.js')) // 合并后的文件名
    .pipe(uglify())   // 压缩js
    .pipe(gulp.dest('src/js'));   // 合并和文件存放地址
});

gulp.task('myimg',function(){
  return  gulp.src('public/img/*')
    .pipe(imagemin())   // 压缩
    .pipe(gulp.dest('src/images'))
});

//  默认执行
gulp.task('default',function(){
    gulp.start('mysass','myjs','myimg');
});

//  监听js和scss自动执行gulp
gulp.task('watch', function () {
  gulp.watch('public/scss/*.scss',['mysass']);
  gulp.watch('public/js/*.js',['myjs']);
});