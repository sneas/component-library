import gulp from 'gulp';
import path from 'path';
import ngResolve from 'node-modules-resolve';

export default function(options) {
    gulp.src(path.resolve(ngResolve('font-awesome'), 'fonts/**'))
        .pipe(gulp.dest(path.resolve(options.outputDir, 'fonts')));
}