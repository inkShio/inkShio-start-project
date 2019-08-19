"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";

gulp.task("watch", (cb) => {
  global.watch = true;

  gulp.parallel(
		"serve"
	)(cb);

  gulp.watch(paths.svg.watch, gulp.series("svg"));

  gulp.watch(paths.scss.watch, gulp.series("scss"));

  gulp.watch(paths.js.libs.watch, gulp.series("libs"));

  gulp.watch(paths.js.scripts.watch, gulp.series("scripts"));

  gulp.watch(paths.images.watch, gulp.series("images"));

  gulp.watch(paths.content.watch, gulp.series("content"));

  gulp.watch(paths.fonts.watch, gulp.series("fonts"));

  gulp.watch(paths.favicons.watch, gulp.series("favicons"));

  gulp.watch(paths.json.watch, gulp.series("json", "pug", "pug-reload"));

  gulp.watch(paths.pug.watch, gulp.series("pug", "pug-reload"))
    .on("all", (event, filepath) => {
      global.emittyChangedFile = filepath;
    });
});
