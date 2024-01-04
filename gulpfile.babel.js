import gulp from 'gulp';
import config from './gulp/config.js';
import clean from './gulp/tasks/clean.js';
import { contentBuild, contentWatch } from './gulp/tasks/content.js';
import { faviconsWatch, generateFavicon, injectFaviconMarkups, saveHtmlFileFavicon } from './gulp/tasks/favicons.js';
import { fontsStyle, fontsWatch, otfToTtf, ttfToWoff, ttfToWoff2 } from './gulp/tasks/fonts.js';
import { imagesBuild, imagesWatch } from './gulp/tasks/images.js';
import { jsonBuild, jsonWatch } from './gulp/tasks/json.js';
import { pugBuild, pugWatch } from './gulp/tasks/pug.js';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts.js';
import { server } from './gulp/tasks/server.js';
import { scssBuild, scssWatch } from './gulp/tasks/styles.js';
import { svgBuild, svgWatch } from './gulp/tasks/svg.js';

config.setEnv();

export const build = gulp.series(
	clean,
	jsonBuild,
	otfToTtf, ttfToWoff, ttfToWoff2, fontsStyle,
	gulp.parallel(
		scssBuild,
		scriptsBuild,
		imagesBuild,
		contentBuild,
		svgBuild,
		pugBuild
	)
);

export const watch = gulp.series(
	build,
	server,
	gulp.parallel(
		jsonWatch,
		scssWatch,
		scriptsWatch,
		imagesWatch,
		contentWatch,
		svgWatch,
		fontsWatch,
		pugWatch,
		faviconsWatch
	)
);

export const favicon = gulp.series(
	generateFavicon, saveHtmlFileFavicon, injectFaviconMarkups
);
