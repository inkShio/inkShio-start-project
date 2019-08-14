"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import browsersync from "browser-sync";

gulp.task("serve", () => {
  browsersync.init({
    server: "./build/",
    port: 4000,
    notify: true
  });
}); 
