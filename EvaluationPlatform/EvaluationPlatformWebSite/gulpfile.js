/// <binding ProjectOpened='watch-app' />
/*Tutorial : http://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/*/
/*Some tasks have been made awaitable by letting the return the promise of the task. This is done to be able to chronlogicaly run tasks with the run-sequence plugin*/

// including plugins
var gulp = require('gulp');
var concat = require("gulp-concat");
var ngAnnotate = require("gulp-ng-annotate");
var minifyHtml = require("gulp-minify-html");
var minifyCss = require("gulp-minify-css");
var minifyJs = require("gulp-uglify");
var runSequence = require("run-sequence");
var sourceMaps = require("gulp-sourcemaps");


/*Concatenate app js files*/
gulp.task('concatApp', function () {
    return gulp.src(['./app/app.js', './app/**/*module.js', './app/**/*.js'])
     .pipe(sourceMaps.init())
        .pipe(concat('concatApp.js'))  // concat and name it "concatApp.js"
     .pipe(sourceMaps.write())
     .pipe(gulp.dest('./bundled'));

});


/*Concatenate 3thparty js files*/
gulp.task('concat3thParty', function () {
    return gulp.src(['./scripts/jquery-2.1.4.js',
         '!./scripts/underscore.js',
        './scripts/angular.js',
        './scripts/angular-ui/ui-bootstrap.js',
        './scripts/angular-ui/ui-bootstrap-tpls.js',
        './scripts/angular-ui/*.js',
        '!./scripts/angular-ui/*.min.js',
        './scripts/loading-bar.js',
        './scripts/angular-touch.js',
        './scripts/**/*.js',
        '!./scripts/**/*.min.js',
        '!./scripts/**/*.min.map'])
    .pipe(concat('concat3thParty.js'))  // concat and name it "concat3thParty.js"
    .pipe(gulp.dest('./bundled'));
});



/*Annotate js files: This removes the need for manualy writing the injection in angular code.*/
gulp.task('annotate', function () {
    return gulp.src('./bundled/concatApp.js') // path to your files
     .pipe(ngAnnotate())
     .pipe(gulp.dest('./bundled'));

});


/*App minification of js files*/
gulp.task('minifyApp', function () {
    return gulp.src('./bundled/concatApp.js') // path to your files
      .pipe(minifyJs())
      .pipe(gulp.dest('./bundled'));
});

/*App minification of 3thparty js files*/
gulp.task('minify-3thParty-js', function () {
    return gulp.src('./bundled/concat3thParty.js') // path to your files
      .pipe(minifyJs())
      .pipe(gulp.dest('./bundled'));
});


/*Html minification*/
gulp.task('minify-html', function () {
    gulp.src('./app/**/*.html') // path to your files
    .pipe(minifyHtml())
    .pipe(gulp.dest('./bundled/html'));
});

/*Css concat*/
gulp.task('concat-FulllCss', function () {
   return gulp.src(['./content/SladeBootstrap/*.css',
        '!./content/SladeBootstrap/*.min.css',
         './content/customCss/*.css',
         './content/angularCss/angular-ui.css',
        './content/*.css',     
        '!./content/*.min.css'
    ]) 
    .pipe(concat('fullCss.css'))
    .pipe(gulp.dest('./bundled'));
});


/*Css minification*/
gulp.task('minify-FulllCss', function () {
   return gulp.src('./bundled/fullCss.css') // path to your file
    .pipe(minifyCss())
    .pipe(gulp.dest('./bundled/'));
});



/*Grouped tasks : package run-sequence is used to line up tasks*/
gulp.task('sequenceBundleRelease', function () {
    runSequence(
        'concat3thParty',
        'concatApp',
        ['annotate', 'concat-FulllCss'],
        ['minifyApp','minify-FulllCss', 'minify-3thParty-js']
         
    );
});

gulp.task('sequenceBundleDevelop', function () {
    runSequence(
        'concat3thParty',
        'concatApp',
        ['annotate', 'concat-FulllCss']
    );
});


/*Watchers*/
gulp.task('watch-app', function () {
    gulp.watch(['./app/**/*.*', './app/*.*', './index.html'], ['sequenceBundleDevelop']);
});