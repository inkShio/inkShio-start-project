"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import concat from "gulp-concat";
import rename from "gulp-rename";
import uglify from "gulp-uglify";
import debug from "gulp-debug";
import browsersync from "browser-sync";

gulp.task("scripts", () => {
  return gulp.src(paths.js.scripts.app)
    // Карта кода
    .pipe(sourcemaps.init())
    // Вывод ошибки
    .pipe(plumber())
    // Склеиваем все библиотеки в один файл
    .pipe(concat("scripts.js"))
    // Добавляем к названию min
    .pipe(rename({
      suffix: ".min"
    }))
    // Минифицируем js
		.pipe(uglify())
    // Кидаем карту кода в папку
    .pipe(sourcemaps.write("./maps/"))
    // Кидаем в папку
    .pipe(gulp.dest(paths.js.scripts.build))
    // Сообщение об успехе
    .pipe(debug({
      "title": "scripts: "
    }))
    // Грузим новый css без перезагрузки страницы
    .on("end", browsersync.reload);
});
