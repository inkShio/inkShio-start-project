"use strict";

import { paths, isDevelopment } from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import newer from "gulp-newer";
import gulpif from "gulp-if";

gulp.task("content", () => {
  return gulp.src(paths.content.app)
    // Проверяем новые файлы контента (только для dev)
	  .pipe(gulpif(isDevelopment, newer(paths.content.build)))
    .pipe(gulp.dest(paths.content.build))
    .pipe(debug({
      "title": "content: "
    }))
    .on("end", browsersync.reload);
});
