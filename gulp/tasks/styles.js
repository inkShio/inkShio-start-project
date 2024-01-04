import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import debug from 'gulp-debug';
import gcmq from 'gulp-group-css-media-queries';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
// import gulpSass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import webpcss from 'gulp-webpcss';
// import dartSass from 'sass';
import config from '../config.js';
import { stream } from './server.js';


import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
const sass = gulpSass(dartSass);


export const scssBuild = () => (
	gulp.src(config.paths.scss.app, {
		sourcemaps: config.isDev
	})
		.pipe(plumber())
		.pipe(sassGlob())
		.pipe(sass({
			includePaths: ['./node_modules'],
			outputStyle: 'expanded'
		}))
		.pipe(webpcss({
			webpClass: '.webp',
			noWebpClass: '.no-webp'
		}))
		.pipe(gulpif(config.isProd, autoprefixer({
			grid: true
		})))
		.pipe(gulpif(config.isProd, gcmq()))
		.pipe(gulpif(config.isProd, cleanCSS({
			level: 2
		})))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(debug({
			'title': 'scss: '
		}))
		.pipe(gulp.dest(config.paths.scss.build, {
			sourcemaps: config.isDev
		}))
		.pipe(stream())
);

export const scssWatch = () => gulp.watch(config.paths.scss.watch, scssBuild);
