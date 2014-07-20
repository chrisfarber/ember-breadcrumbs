var gulp = require("gulp");
var coffee = require("gulp-coffee");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var es = require("event-stream");
var emberEmblem = require("gulp-ember-emblem");
var defineModule = require("gulp-define-module");
var del = require("del");

gulp.task("default", function() {
  var templates = gulp.src("templates/**/*.emblem")
    .pipe(emberEmblem())
    .pipe(defineModule("plain"));

  var source = gulp.src(["./src/initialize.coffee", "./src/**/*.coffee"])
    .pipe(coffee());

  es.merge(templates, source)
    .pipe(concat("ember-breadcrumbs.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist"));
});

gulp.task("clean", function(cb) {
  del(["dist"], cb);
});