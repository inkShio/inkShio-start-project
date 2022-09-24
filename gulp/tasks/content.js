import gulp from 'gulp';
import debug from 'gulp-debug';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import config from '../config';
import { reload } from './server';

const copyContent = () => (
	gulp.src(config.paths.content.app)
		.pipe(plumber())
		.pipe(gulpif(config.isDev, newer(config.paths.content.build)))
		.pipe(gulpif(config.isProd, imagemin([
			imagemin.mozjpeg({
				quality: 80
			}),
			imageminPngquant({
				quality: [0.8, 0.9]
			}),
			imagemin.svgo({
				plugins: [{
					removeViewBox: false
				},
				{
					removeUnusedNS: false
				},
				{
					removeUselessStrokeAndFill: false
				},
				{
					cleanupIDs: false
				},
				{
					removeComments: true
				},
				{
					removeEmptyAttrs: true
				},
				{
					removeEmptyText: true
				},
				{
					collapseGroups: true
				}
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
	gulp.src(config.paths.content.app)
		.pipe(plumber())
		.pipe(newer({
			dest: config.paths.content.build,
			ext: '.webp'
		}))
		.pipe(imagemin([
			imageminWebp({
				quality: 80
			}),
		], {
			verbose: true
		}))
		.pipe(rename({
			extname: '.webp',
		}))
		.pipe(debug({
			'title': 'webp: '
		}))
		.pipe(gulp.dest(config.paths.content.build))
);

export const contentBuild = gulp.series(copyContent, convertContentToWebp);

export const contentWatch = () => gulp.watch(config.paths.content.watch, gulp.series(contentBuild, reload));
