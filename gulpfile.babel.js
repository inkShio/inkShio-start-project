"use strict";

import gulp from "gulp";

const paths = {
  scss: {
    app: "./app/scss/style.scss",
    build: "./build/css/",
    watch: [
      "./app/scss/**/*.scss",
      "./app/blocks/**/*.scss"
    ]
  },
  json: {
    app: "./app/json/*.json",
    build: "./tmp/",
    watch: "./app/json/*.json"
  },
  pug: {
    app: "./app/pug/pages/**/*.pug",
    build: "./build/",
    watch: [
      "./app/pug/**/*.pug",
      "./app/blocks/**/*.pug"
    ]
  },
  js: {
    libs: {
      app: "./app/js/libs/*.js",
      build: "./build/js/",
      watch: "./app/js/libs/*.js"
    },
    scripts: {
      app: [
				"./app/js/scripts/*.js",
				"./app/blocks/**/*.js"
			],
      build: "./build/js/",
      watch: [
				"./app/js/scripts/*.js",
				"./app/blocks/**/*.js"
			]
    }
  },
  svg: {
    app: "./app/static/svg/",
    build: "./build/svg/",
    watch: "./app/static/svg/**/*.svg"
  },
  images: {
    app: "./app/static/images/**/*.{jpg,jpeg,png,gif,tiff,svg}",
    build: "./build/images/",
    watch: "./app/static/images/**/*.{jpg,jpeg,png,gif,tiff,svg}"
  },
  content: {
    app: "./app/static/content/**/*.{jpg,jpeg,png,gif,tiff,svg}",
    build: "./build/content/",
    watch: "./app/static/images/**/*.{jpg,jpeg,png,gif,tiff,svg}"
  },
  fonts: {
    app: "./app/static/fonts/*.{woff,woff2}",
    build: "./build/fonts/",
    watch: "./app/static/fonts/*.{woff,woff2}"
  },
  favicons: {
    app: "./app/static/favicons/*.*",
    build: "./build/favicons/",
    watch: "./app/static/favicons/*.*"
  }
};

const isDevelopment = (process.env.NODE_ENV == "development" ? true : false);

require("./gulp-tasks/svg");
require("./gulp-tasks/serve");
require("./gulp-tasks/scss");
require("./gulp-tasks/libs");
require("./gulp-tasks/scripts");
require("./gulp-tasks/json");
require("./gulp-tasks/pug");
require("./gulp-tasks/pug-reload");
require("./gulp-tasks/images");
require("./gulp-tasks/content");
require("./gulp-tasks/fonts");
require("./gulp-tasks/favicons");
require("./gulp-tasks/watch");

export { paths,  isDevelopment };

export default gulp.series("svg", "scss", "libs", "scripts", "images", "content", "fonts", "favicons", "json", "pug", "watch");
