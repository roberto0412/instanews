const gulp = require("gulp");
const watch = require("gulp-watch");
const eslint = require("gulp-eslint");
const sass = require("gulp-sass");
// Load Gulp!
// Now that we've installed the terser package we can require it:
const terser = require("gulp-terser"),
  rename = require("gulp-rename");

gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

gulp.task("sass", function() {
  return gulp
    .src("./sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./build/css"));
});

gulp.task("watch", function(done) {
  gulp.watch("./js/*.js", gulp.series("scripts"));
  gulp.watch("./sass/*.scss", gulp.series("sass"));
  done();
});

gulp.task("default", gulp.parallel("watch", "scripts"));
