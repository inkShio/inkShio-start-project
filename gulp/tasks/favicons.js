import fs from 'fs';
import gulp from 'gulp';
import inject from 'gulp-inject';
import realFavicon from 'gulp-real-favicon';
import config from '../config.js';
import { reload } from './server.js';

const FAVICON_DATA_FILE = `${config.paths.root.tmp}/faviconData.json`;

export const generateFavicon = (done) => {
	realFavicon.generateFavicon({
		masterPicture: config.paths.favicons.app,
		dest: config.paths.favicons.build,
		iconsPath: '/favicons/',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#ffffff',
				margin: '32%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				},
				appName: 'inkShio start project'
			},
			desktopBrowser: {
				design: 'raw'
			},
			windows: {
				pictureAspect: 'whiteSilhouette',
				backgroundColor: '#d04016',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				},
				appName: 'inkShio start project'
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					name: 'inkShio start project',
					startUrl: 'https://github.com/inkShio/inkShio-start-project',
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#d04016'
			}
		},
		settings: {
			compression: 2,
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: false,
			usePathAsIs: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function () {
		done();
	});
};

export const saveHtmlFileFavicon = (cb) => {
	fs.writeFileSync(`${config.paths.root.tmp}/favicons-meta.html`, JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code);

	cb();
};

export const injectFaviconMarkups = () => (
	gulp.src(`${config.paths.root.build}/*.html`)
		.pipe(inject(gulp.src(`${config.paths.root.tmp}/favicons-meta.html`), {
			removeTags: true,
			starttag: '<!-- inject:favicons-->',
			transform: function (filePath, file) {
				return file.contents.toString('utf8')
			}
		}))
		.pipe(gulp.dest(config.paths.root.build))
);

export const faviconsWatch = () => gulp.watch(config.paths.favicons.watch, gulp.series(generateFavicon, saveHtmlFileFavicon, injectFaviconMarkups, reload));
