import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import gulp from 'gulp';
import debug from 'gulp-debug';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import sortMediaQueries from 'postcss-sort-media-queries';
import * as dartSass from 'sass';
import config from '../config.js';
import { stream } from './server.js';

const sass = gulpSass(dartSass);

const postCssPlugins = [
	autoprefixer({
		grid: true,
		overrideBrowserslist: ['> 1%', 'last 5 versions', 'not dead']
	}),
	sortMediaQueries({
		sort: 'mobile-first'
	}),
	cssnano({
		preset: 'default',
	})
];

export const scssBuild = () => (
	gulp.src(config.paths.scss.app, {
		sourcemaps: config.isDev
	})
		.pipe(plumber())
		.pipe(sass({
			includePaths: ['./node_modules'],
			outputStyle: 'expanded'
		}))
		.pipe(gulpif(config.isProd, postcss(postCssPlugins)))
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
