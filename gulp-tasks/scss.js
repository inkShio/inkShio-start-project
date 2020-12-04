"use strict";

import { paths, isDevelopment } from "../gulpfile.babel";
import gulp from "gulp";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import globbing from "gulp-css-globbing";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import gcmq from "gulp-group-css-media-queries";
import csscomb from "gulp-csscomb";
import mincss from "gulp-clean-css";
import rename from "gulp-rename";
import browsersync from "browser-sync";
import gulpif from "gulp-if";
import debug from "gulp-debug";

gulp.task("scss", () => {
  return gulp.src(paths.scss.app)
    // Карта кода (только для dev)
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    // Вывод ошибки
    .pipe(plumber())
    // Для поиска всех файлов sass (scss)
		.pipe(globbing({
			extensions: [".scss"]
		}))
    // Используем scss
    .pipe(sass({
			outputStyle: "expanded"
		}))
    // Ставим префиксы
    .pipe(autoprefixer())
    // Группируем медиа запросы (только для prod)
    .pipe(gulpif(!isDevelopment, gcmq()))
    // Упорядочим стили (только для prod, csscomb не работает с sourcemaps в режиме dev)
		.pipe(gulpif(!isDevelopment, csscomb()))
    // Минифицируем css (только для prod)
    .pipe(gulpif(!isDevelopment, mincss()))
    // Добавляем к названию min
    .pipe(rename({
      suffix: ".min"
    }))
    // Кидаем карту кода в папку (только для dev)
    .pipe(gulpif(isDevelopment, sourcemaps.write(".")))
    // Кидаем в папку
    .pipe(gulp.dest(paths.scss.build))
    // Сообщение об успехе
    .pipe(debug({
      "title": "scss: "
    }))
    // Грузим новый css без перезагрузки страницы
    .pipe(browsersync.stream());
});
