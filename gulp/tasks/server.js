import browserSync from 'browser-sync';
import config from '../config';

const browserSyncCreate = browserSync.create();

export const server = (cb) => {
	browserSyncCreate.init({
		server: {
			baseDir: config.paths.root.build,
		},
		port: 4000,
		open: false,
		notify: false
	});

	cb();
};

export const reload = (cb) => {
	browserSyncCreate.reload();

	cb();
};

export const stream = () => browserSyncCreate.stream();
