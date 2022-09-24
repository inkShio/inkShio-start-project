import fs from 'fs';
import gulp from 'gulp';
import data from 'gulp-data';
import debug from 'gulp-debug';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import posthtml from 'gulp-posthtml';
import prettyHtml from 'gulp-pretty-html';
import pug from 'gulp-pug';
import versionNumber from 'gulp-version-number';
import posthtmlAttrsSorter from 'posthtml-attrs-sorter';
import through2 from 'through2';
import config from '../config';
import { reload } from './server';

const emitty = require('@emitty/core').configure();

emitty.language({
	extensions: ['.pug'],
	parser: require('@emitty/language-pug').parse,
});

function getFilter(taskName) {
	return through2.obj(function (file, _encoding, callback) {
		emitty.filter(file.path, config.state.watch[taskName]).then((result) => {
			if (result) {
				this.push(file);
			}

			callback();
		});
	});
}

export const pugBuild = () => (
	gulp.src(config.paths.pug.app)
		.pipe(plumber())
		.pipe(data(function (file) {
			return JSON.parse(
				fs.readFileSync(`${config.paths.json.build}/data.json`)
			);
		}))
		.pipe(gulpif(config.state.isWatchMode, getFilter('pugBuild'))) // Enables filtering only in watch mode
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulpif(config.isProd, prettyHtml({
			indent_size: 2,
			indent_char: ' ',
			end_with_newline: true,
			unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br', 'script']
		})))
		.pipe(posthtml([
			posthtmlAttrsSorter({
				order: ['class', 'id', 'name', 'data-.+', 'src', 'for', 'type', 'href', 'value', 'title', 'alt', 'role', 'aria-.+']
			})
		], {}))
		.pipe(gulpif(config.isProd, versionNumber({
			'value': '%DT%',
			'append': {
				'key': 'v',
				'cover': 0,
				'to': [{
					'type': 'css',
					'files': ['style.min.css']
				}, {
					'type': 'js',
					'files': ['scripts.min.js']
				}]
			},
			'output': {
				'file': `${config.paths.json.build}/version.json`
			}
		})))
		.pipe(debug({
			'title': 'pug: '
		}))
		.pipe(gulp.dest(config.paths.pug.build))
);

export const pugWatch = () => {
	config.state.isWatchMode = true;

	gulp.watch(config.paths.pug.watch, gulp.series(pugBuild, reload)).on('all', (event, changed) => {
		// Logs the changed file for the templates task
		config.state.watch.pugBuild = changed;
	});
};
