'use strict';

var gulp = require('gulp'),
  patternImporter = require('pattern-importer'),
  patternImporterUtils = patternImporter.utils,
  path = require('path'),
  watch = require('gulp-watch'),
  map = require('map-stream'),
  merge = require('lodash.merge');


/**
 * Gulp task to convert a specific pattern to browser-ready html/css/js
 * @param {Object} [options] custom options
 * @requires node:path
 * @requires NPM:map-stream
 * @requires module:patternImporter
 */
var compilePattern = function compilePattern (options) {

  return map(function(file, cb) {
    var filepath, formatted;
    filepath = path.dirname(path.relative(process.cwd(), file.path));
    gulp.src(path.join(filepath,options.patternImporterOptions.dataFileName))
      .pipe(patternImporter(options.patternImporterOptions));
    return cb(null, file);
  });
}

/**
 * Gulp task to watch raw pattern folders and convert to browser-ready html/css/js
 * @param {Object} [options] custom options
 * @param {Array,String} options.localPatternFiles  project-relative path to sets of un-compiled patterns
 * @param {Object}  options.patternImporterOptions  options needed for the pattern-importer
 * @requires NPM:Gulp
 * @requires NPM:Gulp-Watch
 * @requires NPM:lodash
 * @requires module:patternImporter.utils
 * @requires function:compilePattern
 */
module.exports = function (projectOptions) {

  /* default options */
  var options = {
    localPatternFiles: ['./app/patterns-local/**/*','./app/templates'],
    patternImporterOptions: patternImporterUtils.getOptions()
  }

  /* merge project and default options */
  merge(options, projectOptions, function (a, b) {
    return Array.isArray(a) ? b : undefined;
  });

  gulp.task('watch-patterns', function() {

    watch(options.localPatternFiles, function (file) {
      gulp.src(file.path)
        .pipe(compilePattern(options));
    });

  })
}
