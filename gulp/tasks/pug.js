import { setup as emittySetup } from 'emitty';
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
import config from '../config.js';
import { reload } from './server.js';

const emittyPug = emittySetup('src', 'pug');

export const pugBuild = (cb) => {
	new Promise((resolve, reject) => {
		emittyPug.scan(global.emittyChangedFile).then(() => {
			gulp.src(config.paths.pug.app)
				.pipe(plumber())
				.pipe(data(function (file) {
					return JSON.parse(
						fs.readFileSync(`${config.paths.json.build}/data.json`)
					);
				}))
				.pipe(gulpif(global.watch, emittyPug.filter(global.emittyChangedFile)))
				.pipe(pug({
					pretty: true
				}))
				.pipe(gulpif(config.isProd, prettyHtml({
					indent_size: 2,
					indent_char: ' ',
					end_with_newline: true,
					unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br', 'script']
				})))
				.pipe(gulpif(config.isProd, posthtml([
					posthtmlAttrsSorter({
						order: ['class', 'id', 'name', 'data-.+', 'src', 'for', 'type', 'href', 'value', 'title', 'alt', 'role', 'aria-.+']
					})
				], {})))
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
				.on('end', resolve)
				.on('error', reject)
		});
	});

	cb();
}

export const pugWatch = () => {
	global.watch = true;

	gulp.watch(config.paths.pug.watch, gulp.series(pugBuild, reload)).on('all', (event, changed) => {
		global.emittyChangedFile = changed;
	});
};
