import sass from 'npm-sass';
import path from 'path';
import writefile from 'writefile';

export default function(options) {
    sass(path.resolve(__dirname, 'sass/cl.scss'), function (err, result) {
        if (err) {
            console.log(err);
        } else {
            writefile(path.format({dir: options.outputDir, base: 'css/cl.css'}), result.css);
        }
    });
}