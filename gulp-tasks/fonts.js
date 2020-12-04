"use strict";

import { paths, isDevelopment } from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";
import newer from "gulp-newer";
import gulpif from "gulp-if";

gulp.task("fonts", () => {
  return gulp.src(paths.fonts.app)
    // Проверяем новые шрифты (только для dev)
    .pipe(gulpif(isDevelopment, newer(paths.fonts.build)))
    .pipe(gulp.dest(paths.fonts.build))
    .pipe(debug({
      "title": "fonts: "
    }));
});
