import copyDir from 'copy-dir';

export default function(inputDir, outputDir) {
    return new Promise(function(resolve) {
        copyDir(inputDir, outputDir, function(err) {
            if (err) {
                throw err;
            }

            resolve();
        });
    });
}