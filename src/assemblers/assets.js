import gulp from 'gulp';
import path from 'path';

export default function(inputDir, outputDir) {
    return new Promise(function(resolve) {
        gulp.src(path.resolve(inputDir, '**/*'), {
                base: inputDir
            })
            .pipe(gulp.dest(outputDir))
            .on('end', resolve);
    });
}