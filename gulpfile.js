var gulp = require("gulp");
var coffee = require("gulp-coffee");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.task("default", function() {
  gulp.src(["./src/initialize.coffee", "./src/**/*.coffee"])
    .pipe(coffee())
    .pipe(concat("ember-breadcrumbs.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist"));
});
