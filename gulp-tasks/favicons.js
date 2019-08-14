"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import imagemin from "gulp-imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminZopfli from "imagemin-zopfli";
import imageminMozjpeg from "imagemin-mozjpeg";
import debug from "gulp-debug";
import browsersync from "browser-sync";

gulp.task("favicons", () => {
  return gulp.src(paths.favicons.app)
    .pipe(imagemin([
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
    ]))
    .pipe(gulp.dest(paths.favicons.build))
    .pipe(debug({
      "title": "favicons: "
    }))
    .on("end", browsersync.reload);
});
