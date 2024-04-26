import gulp from 'gulp';
import debug from 'gulp-debug';
import plumber from 'gulp-plumber';
import webpackStream from 'webpack-stream';
import config from '../config.js';
import { reload } from './server.js';

export const scriptsBuild = () => (
	gulp.src(config.paths.js.app)
		.pipe(plumber())
		.pipe(webpackStream({
			mode: config.isProd ? 'production' : 'development',
			output: {
				filename: 'scripts.min.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', {
									targets: "defaults"
								}]
							]
						}
					}
				}]
			},
			devtool: !config.isProd ? 'source-map' : false
		}))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end');
		})
		.pipe(debug({
			'title': 'scripts: '
		}))
		.pipe(gulp.dest(config.paths.js.build))
);

export const scriptsWatch = () => gulp.watch(config.paths.js.watch, gulp.series(scriptsBuild, reload));
