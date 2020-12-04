"use strict";

import { paths, isDevelopment } from "../gulpfile.babel";
import gulp from "gulp";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import concat from "gulp-concat";
import rename from "gulp-rename";
import uglify from "gulp-uglify";
import debug from "gulp-debug";
import gulpif from "gulp-if";
import browsersync from "browser-sync";

gulp.task("scripts", () => {
  return gulp.src(paths.js.scripts.app)
    // Карта кода (только для dev)
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    // Вывод ошибки
    .pipe(plumber())
    // Склеиваем все библиотеки в один файл
    .pipe(concat("scripts.js"))
    // Добавляем к названию min
    .pipe(rename({
      suffix: ".min"
    }))
    // Минифицируем js (только для prod)
		.pipe(gulpif(!isDevelopment, uglify()))
    // Кидаем карту кода в папку (только для dev)
    .pipe(gulpif(isDevelopment, sourcemaps.write(".")))
    // Кидаем в папку
    .pipe(gulp.dest(paths.js.scripts.build))
    // Сообщение об успехе
    .pipe(debug({
      "title": "scripts: "
    }))
    // Грузим новый css без перезагрузки страницы
    .on("end", browsersync.reload);
});
