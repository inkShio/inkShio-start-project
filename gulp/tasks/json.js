import gulp from 'gulp';
import debug from 'gulp-debug';
import jsonConcat from 'gulp-json-concat';
import plumber from 'gulp-plumber';
import config from '../config';
import { pugBuild } from './pug';
import { reload } from './server';

export const jsonBuild = () => (
	gulp.src(config.paths.json.app)
		.pipe(plumber())
		.pipe(
			jsonConcat('data.json', function (data) {
				return Buffer.from(JSON.stringify(data));
			})
		)
		.pipe(debug({
			'title': 'json: '
		}))
		.pipe(gulp.dest(config.paths.json.build))
);

export const jsonWatch = () => gulp.watch(config.paths.json.watch, gulp.series(jsonBuild, pugBuild, reload));
