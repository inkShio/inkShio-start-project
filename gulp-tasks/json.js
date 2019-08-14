"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import plumber from "gulp-plumber";
import jsonConcat from "gulp-json-concat";
import debug from "gulp-debug";

gulp.task("json", () => {
  return gulp.src(paths.json.app)
  // Вывод ошибки
  .pipe(plumber())
  // Собираем json файлы
  .pipe(jsonConcat('data.json', function(data){
    return Buffer.from(JSON.stringify(data));
  }))
  // Кидаем в папку
  .pipe(gulp.dest(paths.json.build))
  // Сообщение об успехе
  .pipe(debug({
    "title": "json: "
  }));
});
