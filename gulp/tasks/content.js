import gulp from 'gulp';
import debug from 'gulp-debug';
import gulpif from 'gulp-if';
import imagemin, { mozjpeg, optipng, svgo } from 'gulp-imagemin';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import webp from 'gulp-webp';
import config from '../config.js';
import { reload } from './server.js';

const copyContent = () => (
	gulp.src([config.paths.content.app], { encoding: false })
		.pipe(plumber())
		.pipe(gulpif(config.isDev, newer(config.paths.content.build)))
		.pipe(gulpif(config.isProd, imagemin([
			mozjpeg({
				quality: 80,
				progressive: true
			}),
			optipng({
				optimizationLevel: 5
			}),
			svgo({
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								cleanupIds: false,
								removeUselessStrokeAndFill: false,
								removeViewBox: false,
								removeUnusedNS: false,
							},
						},
					},
				],
			}),
		], {
			verbose: true
		})))
		.pipe(debug({
			'title': 'images: '
		}))
		.pipe(gulp.dest(config.paths.content.build))
);

const convertContentToWebp = () => (
	gulp.src([config.paths.content.app], { encoding: false })
		.pipe(plumber())
		.pipe(newer({
			dest: config.paths.content.build,
			ext: '.webp'
		}))
		.pipe(webp())
		.pipe(debug({
			'title': 'webp: '
		}))
		.pipe(gulp.dest(config.paths.content.build))
);

export const contentBuild = gulp.series(copyContent, convertContentToWebp);

export const contentWatch = () => gulp.watch(config.paths.content.watch, gulp.series(contentBuild, reload));
