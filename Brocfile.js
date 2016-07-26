'use strict';

const concatenate = require('broccoli-concat');
const mergeTrees = require('broccoli-merge-trees');
const pickFiles = require('broccoli-static-compiler');
const uglifyJS = require('broccoli-uglify-js');
const app = 'app';
let appCSS;
let appHTML;
let appJS;
let appImages;

/*
 * move index from `app/` to root of tree
 */
appHTML = pickFiles(app, {
    srcDir: '/',
    files: ['index.html'],
    destDir: '/'
});

/*
 * concat and compress all js files from `app/js/` and move to root
 */
appJS = concatenate(app, {
  inputFiles: ['js/**/*.js'],
  outputFile: '/app.js'
});

appJS = uglifyJS(appJS, {
  compress: true
});

/*
 * concat all css files from `app/css/` and move to root
 */
appCSS = concatenate(app, {
  inputFiles: ['css/**/*.css'],
  outputFile: '/app.css'
});

/*
 * move images from `app/img` to image folder
 */
appImages = pickFiles(app, {
  srcDir: '/img',
  files: ['**/*'],
  destDir: '/img'
});

// merge the trees and export
module.exports = mergeTrees([appHTML, appJS, appCSS, appImages]);
