const srcFolder = './src';
const buildFolder = './build';
const tmpFolder = './tmp';

const config = {
	paths: {
		root: {
			src: `${srcFolder}`,
			build: `${buildFolder}`,
			tmp: `${tmpFolder}`
		},
		scss: {
			app: `${srcFolder}/scss/style.scss`,
			build: `${buildFolder}/css`,
			watch: [`${srcFolder}/scss/**/*.scss`, `${srcFolder}/blocks/**/*.scss`]
		},
		json: {
			app: `${srcFolder}/json/*.json`,
			build: `${tmpFolder}`,
			watch: `${srcFolder}/json/*.json`
		},
		pug: {
			app: `${srcFolder}/pug/pages/**/*.pug`,
			build: `${buildFolder}`,
			watch: [`${srcFolder}/pug/**/*.pug`, `${srcFolder}/blocks/**/*.pug`]
		},
		js: {
			app: `${srcFolder}/js/main.js`,
			build: `${buildFolder}/js`,
			watch: [`${srcFolder}/js/**/*.js`, `${srcFolder}/blocks/**/*.js`]
		},
		svg: {
			app: `${srcFolder}/static/svg`,
			build: `${buildFolder}/svg`,
			watch: `${srcFolder}/static/svg/**/*.svg`
		},
		images: {
			app: `${srcFolder}/static/images/**/*.{jpg,jpeg,png,gif,svg,webp}`,
			build: `${buildFolder}/images`,
			watch: `${srcFolder}/static/images/**/*.{jpg,jpeg,png,gif,svg,webp}`
		},
		content: {
			app: `${srcFolder}/static/content/**/*.{jpg,jpeg,png,gif,svg,webp}`,
			build: `${buildFolder}/content`,
			watch: `${srcFolder}/static/images/**/*.{jpg,jpeg,png,gif,svg,webp}`
		},
		fonts: {
			app: `${srcFolder}/static/fonts`,
			build: `${buildFolder}/fonts`,
			watch: `${srcFolder}/static/fonts/*.{otf, ttf}`
		},
		favicons: {
			app: `${srcFolder}/static/favicons/favicon.svg`,
			build: `${buildFolder}/favicons`,
			watch: `${srcFolder}/static/favicons/*.*`
		},
	},
	state: {
		isWatchMode: false,
		// Changed files are written by the name of the task that will process them.
		// This is necessary to support more than one language in @emitty.
		watch: {
			pugBuild: undefined
		}
	},
	setEnv() {
		this.isProd = process.argv.includes('--prod');
		this.isDev = !this.isProd;
	},
};

export default config;

