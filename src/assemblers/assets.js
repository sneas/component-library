import gulp from 'gulp';
import path from 'path';

export default function(inputDir, outputDir) {
    return new Promise(function(resolve, reject) {
        gulp.src(path.resolve(inputDir, '**/*'), {
                base: inputDir
            })
            .on('error', reject)
            .pipe(gulp.dest(outputDir))
            .on('end', resolve);
    });
}