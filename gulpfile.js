var gulp = require("gulp");
var coffee = require("gulp-coffee");
var del = require("del");

gulp.task("default", function() {

  gulp.src(["./src/**/*.coffee"])
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest("./app"));

});

gulp.task("clean", function(cb) {
  del(["./app/components", "./app/initializers"], cb);
});
