import gulp from 'gulp';
import config from './gulp/config';
import clean from './gulp/tasks/clean';
import { contentBuild, contentWatch } from './gulp/tasks/content';
import { faviconsWatch, generateFavicon, injectFaviconMarkups, saveHtmlFileFavicon } from './gulp/tasks/favicons';
import { fontsStyle, fontsWatch, otfToTtf, ttfToWoff, ttfToWoff2 } from './gulp/tasks/fonts';
import { imagesBuild, imagesWatch } from './gulp/tasks/images';
import { jsonBuild, jsonWatch } from './gulp/tasks/json';
import { pugBuild, pugWatch } from './gulp/tasks/pug';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
import { server } from './gulp/tasks/server';
import { scssBuild, scssWatch } from './gulp/tasks/styles';
import { svgBuild, svgWatch } from './gulp/tasks/svg';

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
