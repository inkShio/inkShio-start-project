"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import plumber from "gulp-plumber";
import rename from "gulp-rename";
import path from "path";
import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
import replace from "gulp-replace";
import svgstore from "gulp-svgstore";
import debug from "gulp-debug";

gulp.task("svg", () => {
  return gulp.src(paths.svg.app + "**/*.svg", {base: paths.svg.app})
    // Вывод ошибки
    .pipe(plumber())
    // Нормальные названия спрайтов
    .pipe(rename(function (file) {
      var name = file.dirname.split(path.sep);
      name.push(file.basename);
      file.basename = name.join("-");
    }))
    // Минифицируем
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // Удалаем все лишнее
    .pipe(cheerio({
      run: function($) {
        //$("[fill]").removeAttr("fill");
        //$("[stroke]").removeAttr("stroke");
        $("[style]").removeAttr("style");
        $("path[class]").removeAttr("class");
        $("style").remove();
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(replace("&gt;", ">"))
    // Создаем спрайт
    .pipe(svgstore({
      inlineSvg: true
    }))
    // Переименовываем файл
    .pipe(rename({
      basename: "svg-sprite"
    }))
    // Кидаем в папку
    .pipe(gulp.dest(paths.svg.build))
    // Сообщение об успехе
    .pipe(debug({
      "title": "svg: "
    }));
});
