import del from 'del';
import fs from 'fs';
import gulp from 'gulp';
import debug from 'gulp-debug';
import fonter from 'gulp-fonter';
import plumber from 'gulp-plumber';
import ttf2woff2 from 'gulp-ttf2woff2';
import config from '../config.js';
import { reload } from './server.js';
import { scssBuild } from './styles.js';

export const otfToTtf = () => (
	gulp.src(`${config.paths.fonts.app}/*.otf`)
		.pipe(plumber())
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(debug({
			'title': 'font (ttf): '
		}))
		.pipe(gulp.dest(config.paths.root.tmp))
);

export const ttfToWoff = () => (
	gulp.src([`${config.paths.root.tmp}/*.ttf`, `${config.paths.fonts.app}/*.ttf`])
		.pipe(plumber())
		.pipe(fonter({
			formats: ['woff']
		}))
		.pipe(debug({
			'title': 'font (woff): '
		}))
		.pipe(gulp.dest(config.paths.fonts.build))
);

export const ttfToWoff2 = () => (
	gulp.src([`${config.paths.root.tmp}/*.ttf`, `${config.paths.fonts.app}/*.ttf`])
		.pipe(plumber())
		.pipe(ttf2woff2())
		.pipe(debug({
			'title': 'font (woff2): '
		}))
		.pipe(gulp.dest(config.paths.fonts.build))
);

export const fontsStyle = (cb) => {
	let fontsFile = `${config.paths.root.tmp}/fonts-generated.scss`;

	fs.readdir(config.paths.fonts.build, (err, fontsFiles) => {
		fs.writeFile(fontsFile, '', cb);

		if (fontsFiles) {
			let newFileOnly;

			for (let i = 0; i < fontsFiles.length; i++) {
				let fontFileName = fontsFiles[i].split('.')[0];

				if (newFileOnly !== fontFileName) {
					let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
					let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

					switch (fontWeight.toLowerCase()) {
						case 'thin':
							fontWeight = 100;
							break;
						case 'extralight':
							fontWeight = 200;
							break;
						case 'ligth':
							fontWeight = 300;
							break;
						case 'medium':
							fontWeight = 500;
							break;
						case 'semibold':
							fontWeight = 600;
							break;
						case 'bold':
							fontWeight = 700;
							break;
						case 'extrabold':
						case 'heavy':
							fontWeight = 800;
							break;
						case 'black':
							fontWeight = 900;
							break;
						default:
							fontWeight = 400;
					}

					fs.appendFile(fontsFile,
						`\n@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url('../fonts/${fontFileName}.woff2') format('woff2'), url('../fonts/${fontFileName}.woff') format('woff');\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}`, cb)
					newFileOnly = fontFileName;
				}
			}
		}
	});

	cb();
}

const cleanFonts = () => (
	del([config.paths.fonts.build, `${config.paths.root.tmp}/*.ttf`, `${config.paths.root.tmp}/fonts-generated.scss`])
);

export const fontsWatch = () => gulp.watch(config.paths.fonts.watch, gulp.series(cleanFonts, otfToTtf, ttfToWoff, ttfToWoff2, fontsStyle, scssBuild, reload));
