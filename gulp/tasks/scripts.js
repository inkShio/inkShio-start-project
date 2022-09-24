import browserify from 'browserify';
import gulp from 'gulp';
import debug from 'gulp-debug';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import config from '../config';
import { reload } from './server';

export const scriptsBuild = () => (
	browserify(config.paths.js.app, {
		debug: true
	})
		.transform('babelify', {
			presets: ['@babel/preset-env']
		})
		.bundle()
		.on('error', function browserifyError(error) {
			console.log(error.stack);
			this.emit('end');
		})
		.pipe(source('scripts.min.js'))
		.pipe(buffer())
		.pipe(gulpif(config.isDev, sourcemaps.init({
			loadMaps: true
		})))
		.pipe(gulpif(config.isProd, uglify()))
		.pipe(gulpif(config.isDev, sourcemaps.write()))
		.pipe(debug({
			'title': 'scripts: '
		}))
		.pipe(gulp.dest(config.paths.js.build))
);

export const scriptsWatch = () => gulp.watch(config.paths.js.watch, gulp.series(scriptsBuild, reload));
