// Dependency imports
const gulp = require("gulp");
const uglify = require("gulp-uglify");
const livereload = require("gulp-livereload");
const concat = require("gulp-concat");
const minifyCss = require("gulp-minify-css");
const autoprefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");

// File paths
// Looks for any JS files within any folders in the public/scripts path
const DIST_PATH = "public/dist";
const SCRIPTS_PATH = "public/scripts/**/*.js";
const CSS_PATH = "public/css/**/*.css";

// Gulp Tasks based on plugins
// Use gulp.task() to create task, passing in two parameters 1. the name of the string for the task
// 2. The function you want the task to do.
// To run the task, in the terminal, type 'gulp ' followed by the name of that task you want to run

// Styles - minifies css, concatenating multiple files and autofixing css
gulp.task("styles", async () => {
    console.log("starting styles task");

    // refer to scripts task to understand what is going on here. You can pass in an array to src(), the first index will be the file that you want to run first, and so on. In this example, the reset.css styles are applied first then the CSS_PATH variable is applied. plumber() will catch any errors that may happen for the following steps and if an error is caught, then the function defined will handle it, the this.emit("end") will stop any steps that follow the error but will keep the gulp.watch running. wuautoprefixer() will sync up browser styles so no unexpected styling is applied for one and different on another. You can add options to the autoprefixer function Concat() gets all the files and bundles it into one 'styles.css'.
    return gulp.src(["public/css/reset.css", CSS_PATH])
        .pipe(plumber(function (err) {
            console.log("Styles task Error");
            console.log(err);
            this.emit("end");
        }))
        .pipe(autoprefixer())
        .pipe(concat("styles.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
})

// Scripts - minifies js, concatenating files and compiling from babel
gulp.task("scripts", async () => {
    console.log("starting scripts task");

    // This loads the files from the project into gulp to do something with them.
    // Pass in the file(s) in as a parameter that you want to use. This example uses
    // all JS files in the public/scripts folder. Chain this return with the pipe() 
    // function which allows you to pass your files through multiple steps. The next step
    // is to minimise your code by removing whitespaces with uglify(). Then, save
    // the uglified code in with gulp.dest(), specifying the path that you want to save it to. Finally, add livereload() to trigger a reload of the browser. 

    return gulp.src(SCRIPTS_PATH)
        .pipe(uglify())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload())
})

// Images - Compress images to smaller size without losing quality
gulp.task("images", async () => {
    console.log("starting images task");
})

// There is a default task that is run and can be called by the terminal with 'gulp' on its own.
// This is a built-in task and is used to bootstrap all the other tasks to call it in one place.
gulp.task("default", async () => {
    console.log("starting default task");
});

// This watch task is used for the gulp watch plugin and is conventional to call it this. This looks for any changes and automatically recompiles the files.
gulp.task("watch", async () => {
    console.log("starting watch task");
    // Call the server.js file to run the server before starting the watch task.
    require('./server.js');
    // Listens for changes that will reload the browser if there is any. In order to do this, you also have to modify the individual task that trigger a reload.
    livereload.listen();
    // Pass in the path of the files that you want to watch. The next thing is the array of tasks that you want to run. In this case, if the scripts change, you only want to run the scripts task. Do this with gulp.series() and passing in 'scripts'
    gulp.watch(SCRIPTS_PATH, gulp.series("scripts"));
    gulp.watch(CSS_PATH, gulp.series("styles"));
});