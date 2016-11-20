import sass from 'npm-sass';
import writefile from 'writefile';

export default function(input, output) {
    return new Promise(function(resolve, reject) {
        sass(input, function (err, result) {
            if (err) {
                reject(err);
            } else {
                writefile(output, result.css);
                resolve();
            }
        })
    });
}