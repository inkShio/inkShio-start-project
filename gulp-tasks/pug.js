"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import plumber from "gulp-plumber";
import fs from "fs";
import data from "gulp-data";
import pug from "gulp-pug";
import prettyHtml from "gulp-pretty-html";
import replace from "gulp-replace";
import debug from "gulp-debug";
import gulpif from "gulp-if";
import { setup as emittySetup } from "emitty";

const emittyPug = emittySetup("app", "pug");

gulp.task("pug", () =>
  new Promise((resolve, reject) => {
    emittyPug.scan(global.emittyChangedFile).then(() => {
      //console.log(emittyPug.storage());
      gulp.src(paths.pug.app)
        // Вывод ошибки
        .pipe(plumber())
        .pipe(gulpif(global.watch, emittyPug.filter(global.emittyChangedFile)))
        // json данные для pug
        .pipe(data(function(file) {
          return JSON.parse(
            fs.readFileSync("./tmp/data.json")
          );
        }))
        .pipe(pug({
          pretty: true
        }))
        .pipe(prettyHtml({
          indent_size: 2,
          indent_char: " ",
          unformatted: ["code", "em", "strong", "span", "i", "b", "br", "script"],
          content_unformatted: [],
        }))
        .pipe(replace(/^(\s*)(<button.+?>)(.*)(<\/button>)/gm, '$1$2\n$1  $3\n$1$4'))
        .pipe(replace(/^( *)(<.+?>)(<script>)([\s\S]*)(<\/script>)/gm, '$1$2\n$1$3\n$4\n$1$5\n'))
        .pipe(replace(/^( *)(<.+?>)(<script\s+src.+>)(?:[\s\S]*)(<\/script>)/gm, '$1$2\n$1$3$4'))
        .pipe(gulp.dest(paths.pug.build))
        .on("end", resolve)
        .on("error", reject)
        // Сообщение об успехе
        .pipe(debug({
          "title": "pug: "
        }));
    });
  })
);
