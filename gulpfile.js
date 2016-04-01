'use strict';

// require() is not part of javascript - it is node.js. It is just like a php require - it inserts the code from the specified
// file or package. If you pass in a whole file path (like "require('./gulp')") it will look for that as a file. If you
// just pass in a name like we have here, it will treat it as a package to search for
// ###################################################################################################################
// require() automatically looks at the folder that the current file lives in for a file of the given name (it assumes
// the file ends with ".js"). If the file is not there, it checks the package.json at that level, and if the specified name
// is there, it then searches the folder node_modules for a folder with the given name, and then searches that folder for
// its package.json, and then looks for the "main" or "files" section of that .json, and that points to another file, which
// in this case is index.js. THAT is the code that becomes included.
// ###################################################################################################################
// To make this work, in the terminal, from the home directory of the project, we need to run "npm install" which will
// create the node_modules folder in this project, and automatically installs gulp among many other things. Then we have
// to run "npm install --global gulp" to make gulp install globally. We have to specify 'gulp' because globally there isn't
// a package.json for it to look at. May have to specify "sudo" before the command to make it work
var gulp = require('gulp');

// We updated our dependencies and installed this package by going into the terminal from our home directory and typing
// "npm install browserify --save-dev" which will install the browserify package and then uses the "--save-dev" portion to
// add it as a dev dependency. It is a dev dependency instead of a normal dependency because we are only using it for
// development to organize our work. Our app is not going to be inherently reliant on it
var browserify = require('browserify');

// "npm install vinyl-source-stream --save-dev"
var source = require('vinyl-source-stream');

// "npm install vinyl-buffer --save-dev"
var buffer = require('vinyl-buffer');


// Creates a task called 'bundle'. Now, in the terminal when we are inside the home directory, we could type 'gulp bundle'
// which will run the anonymous function specified.
// ###################################################################################################################
// The task has a syntax specified on the browserify.org page. It has 2 'vinyl' dependencies (defined above) that we had
// to install in addition to the 'gulp' and 'browserify' dependencies
// ###################################################################################################################
// pipe() takes the output of the previous command, and then passes it into the next command
// ###################################################################################################################
// buffer() takes a file as input, and outputs it as a vinyl file
// ###################################################################################################################
// This will take the 'app.js' file, 'browserify' it, and the put that output into a file called 'bundle.js' in the
// 'public/js/' folder
// ###################################################################################################################
// 'debug: true' makes it so that when we see error logs in the console, it shows the file and line number of the actual
// file (just as PostModel.js) instead of showing the line number that the code is inserted into app.js on from require().
// This is called a "source map." It shows up as a long random string at the bottom of bundle.js that the browser reads
// and interprets to understand where errors show up
// ###################################################################################################################
// Normally if you try to run 'bundle' and there is an error in your code, it will break your 'watch' but no errors will
// show up in your console, which will leave you refreshing your page over and over without seeing any changes. So as a
// solution, the on('error', function(error) { ... } makes sure that if bundle fails, the 'watch' won't break, but will
// instead keep trying until it works
gulp.task('bundle', function() {
    return browserify({
        entries: ['public/src/js/app.js'],
        debug: true
    }).bundle()
        .on('error', function(error) {
            console.log(error.toString());
            this.emit('end');
        })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('public/js/'));
});


// Watch for a change in public/src/js/..., and when a change is detected, run 'bundle'
gulp.task('watch', function() {
    gulp.watch('public/src/js/**/*.js', ['bundle']);
});

// If we name the task 'default' we could just type "gulp" in the terminal, to run the task. 'default' runs automatically.
// No other task name does this - 'default' is a special name
// Now in the terminal when we type 'gulp', it bundles the code and then turns on the 'watch' task to listen for further
// changes, which when detected re-run bundle as described above
gulp.task('default', ['bundle', 'watch']);
