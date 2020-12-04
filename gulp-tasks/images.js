"use strict";

import { paths, isDevelopment } from "../gulpfile.babel";
import gulp from "gulp";
import imagemin from "gulp-imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminZopfli from "imagemin-zopfli";
import imageminMozjpeg from "imagemin-mozjpeg";
import debug from "gulp-debug";
import gulpif from "gulp-if";
import newer from "gulp-newer";
import browsersync from "browser-sync";

gulp.task("images", () => {
  return gulp.src(paths.images.app)
    // Проверяем новые изображения (только для dev)
    .pipe(gulpif(isDevelopment, newer(paths.images.build)))
    // Минимизируем картинки (только для prod)
    .pipe(gulpif(!isDevelopment, imagemin([
      imageminPngquant({
        speed: 5,
        quality: [0.6, 0.8]
      }),
      imageminZopfli({
        more: true
      }),
      imageminMozjpeg({
        progressive: true,
        quality: 90
      }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { removeUnusedNS: false },
          { removeUselessStrokeAndFill: false },
          { cleanupIDs: false },
          { removeComments: true },
          { removeEmptyAttrs: true },
          { removeEmptyText: true },
          { collapseGroups: true }
        ]
      })
    ])))
    .pipe(gulp.dest(paths.images.build))
    .pipe(debug({
      "title": "images: "
    }))
    .on("end", browsersync.reload);
});
