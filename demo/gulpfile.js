var gulp = require('gulp'),
    path = require('path'),
    //componentLibrary = require('component-library')
    componentLibrary = require('../index.js');

gulp.task('compile', function() {
    componentLibrary({
        templatesDir: path.format({dir: __dirname, base: 'templates'}),
        outputDir: path.format({dir: __dirname, base: 'public/component-library'}),
        baseUrl: '/component-library/',
        js: [
            '/component-library/external.js'
        ],
        css: [
            '/component-library/external.css',
            'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
        ]
    });
});

gulp.task('watch', ['compile'], function() {
    gulp.watch(['templates/**/*', '../views/**/*', '../sass/**/*', '../assets/**/*'], ['compile']);
});