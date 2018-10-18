import gulp from "gulp";
import inline from "gulp-inline";

const paths = {
  html: {
    src: "dist/**/*.html",
    dest: "assets/"
  }
};

export function build() {
  return gulp
    .src(paths.html.src)
    .pipe(
      inline({
        base: "./",
      })
    )
    .pipe(gulp.dest(paths.html.dest));
}
// const build = gulp.series(clean, combine);
gulp.task("build", build);

/*
 * Export a default task
 */
export default build;
