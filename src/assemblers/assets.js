import gulp from 'gulp';
import path from 'path';

export default function(options) {
    gulp.src([
        path.resolve(__dirname, 'assets/**/*')
    ]).pipe(gulp.dest(options.outputDir));
}