import gulp from 'gulp';
import cheerio from 'gulp-cheerio';
import debug from 'gulp-debug';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import path from 'path';
import config from '../config.js';
import { reload } from './server.js';

export const svgBuild = () => (
	gulp.src(`${config.paths.svg.app}/**/*.svg`, {
		base: config.paths.svg.app
	})
		.pipe(plumber())
		.pipe(
			rename(function (file) {
				const name = file.dirname.split(path.sep);
				name.push(file.basename);
				file.basename = name.join('-');
			})
		)
		.pipe(
			svgmin({
				js2svg: {
					pretty: true,
				},
			})
		)
		.pipe(
			cheerio({
				run: function ($) {
					// $('[fill]').removeAttr('fill');
					// $('[stroke]').removeAttr('stroke');
					$('[style]').removeAttr('style');
					$('path[class]').removeAttr('class');
					$('style').remove();
				},
				parserOptions: {
					xmlMode: true,
				},
			})
		)
		.pipe(replace('&gt;', '>'))
		.pipe(
			svgstore({
				inlineSvg: true,
			})
		)
		.pipe(
			rename({
				basename: 'svg-sprite',
			})
		)
		.pipe(gulp.dest(config.paths.svg.build))
		.pipe(
			debug({
				'title': 'svg: ',
			})
		)
);

export const svgWatch = () => gulp.watch(config.paths.svg.watch, gulp.series(svgBuild, reload));
