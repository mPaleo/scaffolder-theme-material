'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var replace = require('gulp-replace');
var debug = require('gulp-debug');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function ()
{
	browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function ()
{
	//console.log("entrou inject") ;

	var injectStyles = gulp.src([
		path.join(conf.paths.tmp, '/serve/app/**/*.css'),
		path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
	], {read: false});

	var injectScripts = gulp.src([
			path.join(conf.paths.rsc, '/**/*.module.js'),
			path.join(conf.paths.rsc, '/**/*.js'),
			path.join(conf.paths.src, '/app/**/*.module.js'),
			path.join(conf.paths.src, '/app/**/*.js'),
			path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
			path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
		])
		.pipe($.replace('addPart("resources/angularjs/', 'addPart("app/'))
		.pipe($.replace("addPart('resources/angularjs/'", "addPart('app/"))
		.pipe($.replace("angularjs'", "app"))
		.pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

	var injectOptions = {
		ignorePath  : [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
		addRootSlash: false
	};

	return gulp.src(path.join(conf.paths.src, '/*.html'))
		.pipe($.inject(injectStyles, injectOptions))
		.pipe($.inject(injectScripts, injectOptions))
		.pipe(wiredep(_.extend({}, conf.wiredep)))
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});