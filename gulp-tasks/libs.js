"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import plumber from "gulp-plumber";
import concat from "gulp-concat";
import debug from "gulp-debug";
import browsersync from "browser-sync";

gulp.task("libs", () => {
  return gulp.src(paths.js.libs.app)
    // Вывод ошибки
    .pipe(plumber())
    // Склеиваем все библиотеки в один файл
    .pipe(concat('libs.js'))
    // Кидаем в папку
    .pipe(gulp.dest(paths.js.libs.build))
    // Сообщение об успехе
    .pipe(debug({
      "title": "libs: "
    }))
    // Грузим новый css без перезагрузки страницы
    .on("end", browsersync.reload);
});
