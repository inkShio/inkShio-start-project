"use strict";

import { paths, isDevelopment } from "../gulpfile.babel";
import gulp from "gulp";
import plumber from "gulp-plumber";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import debug from "gulp-debug";
import gulpif from "gulp-if";
import browsersync from "browser-sync";

gulp.task("libs", () => {
  return gulp.src(paths.js.libs.app)
    // Вывод ошибки
    .pipe(plumber())
    // Склеиваем все библиотеки в один файл
    .pipe(concat("libs.js"))
		// Минифицируем js (только для prod)
		.pipe(gulpif(!isDevelopment, uglify()))
    // Кидаем в папку
    .pipe(gulp.dest(paths.js.libs.build))
    // Сообщение об успехе
    .pipe(debug({
      "title": "libs: "
    }))
    // Перезагрузка страницы
    .on("end", browsersync.reload);
});
