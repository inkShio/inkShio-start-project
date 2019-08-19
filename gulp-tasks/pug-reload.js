"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import browsersync from "browser-sync";

gulp.task("pug-reload", () => {
  return gulp.src(paths.pug.build)
	// Перезагружаем страницу
	.pipe(browsersync.reload({
		stream: true
	}));
});
