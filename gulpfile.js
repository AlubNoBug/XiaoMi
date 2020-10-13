/*
    把.scss文件 => css文件 => 压缩 => min.css
*/ 
//引入
const gulp = require("gulp");
const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");

/*
    index.scss => index.css => index.min.css(重命名)
*/ 
gulp.task("scss", function(){
    return gulp.src("stylesheet/index.scss") //原路径
    .pipe(scss())//编译
    .pipe(gulp.dest("dist/css"))//存放到dis/css文件夹
    .pipe(minifyCSS())//压缩
    .pipe(rename("index.min.css"))//重命名
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

/*
    批量处理
*/
gulp.task("scssAll", function(){
    return gulp.src("stylesheet/*.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

//处理.js
gulp.task("scripts", function(){
    return gulp.src(["*.js", "!gulpfile.js"])//感叹号排除
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})


//处理.html
gulp.task("copy-html", function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
})

//处理.json数据
gulp.task("data", function(){
    return gulp.src(["*.json", "!package.json"])//package.json记录当前gulp项目的配置信息，不是数据源
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

//处理图片
gulp.task("images", function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

//一次性执行多个任务
gulp.task("build", ["scss", "scripts", "copy-html", "data", "scssAll", "images"], function(){
    console.log("项目创建成功");
})

/*
    建立监听
    如果监听到前面文件发生改变，就执行后面的任务。
*/
gulp.task("watch", function(){
    gulp.watch("stylesheet/index.scss", ["scss"]);
    gulp.watch("stylesheet/*.scss", ["scssAll"]);
    gulp.watch(["*.js", "!gulpfile.js"], ["scripts"]);
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch(["*.json", "!package.json"], ['data']);
    gulp.watch("images/**/*", ['images']);
})

//启动服务器
const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root:"dist",
        port:8887,
        livereload:true
    })
})

//启动一个默认的任务 直接使用gulp运行，不用任务名
gulp.task("default", ["watch", "server"]);
