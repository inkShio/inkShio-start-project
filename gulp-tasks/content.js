"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";
import browsersync from "browser-sync";

gulp.task("content", () => {
  return gulp.src(paths.content.app)
    .pipe(gulp.dest(paths.content.build))
    .pipe(debug({
      "title": "content: "
    }))
    .on("end", browsersync.reload);
});
