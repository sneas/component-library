var gulp = require('gulp'),
    path = require('path'),
    kitchenSink = require('./index.js');

gulp.task('compile', function() {
    kitchenSink({
        patternsDir: path.format({dir: __dirname, base: 'example/templates'}),
        outputDir: path.format({dir: __dirname, base: 'example/public'}),
        baseUrl: '/kitchen/example/public/',
        js: [
            '/kitchen/example/public/external.js'
        ],
        css: [
            '/kitchen/example/public/external.css'
        ]
    });
});

gulp.task('watch', ['compile'], function() {
    gulp.watch(['example/templates/**/*', 'jade/**/*', 'sass/**/*', 'assets/**/*'], ['compile']);
});