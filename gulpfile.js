    
'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var inky = require('inky');
var inlineCss = require('gulp-inline-css');
var inlinesource = require('gulp-inline-source');
var browserSync = require('browser-sync');


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

//STYLES
gulp.task('styles', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
});


//CONVERTE INKY
gulp.task('inky', function() {
    return gulp.src('./templates/**/*.html')
    .pipe(inlinesource())
    .pipe(inky())
    .pipe(inlineCss({
        preserveMediaQueries: true,
        removeLinkTags: false
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({ stream: true }))
});

//WATCH
gulp.task('watch', function() {
    gulp.watch(['scss/**/*.scss', 'templates/**/*.html'], gulp.series('styles', 'inky'));
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));