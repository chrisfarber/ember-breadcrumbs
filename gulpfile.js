var gulp = require("gulp");
var coffee = require("gulp-coffee");
var concat = require("gulp-concat");
var del = require("del");

gulp.task("default", function() {

  gulp.src(["./src/initialize.coffee", "./src/**/*.coffee"])
    .pipe(coffee())
    .pipe(concat("ember-breadcrumbs.js"))
    .pipe(gulp.dest("./dist"));

});

gulp.task("clean", function(cb) {
  del(["dist"], cb);
});