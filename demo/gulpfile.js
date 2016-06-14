var gulp = require('gulp'),
    path = require('path'),
    clean = require('gulp-clean'),
    //componentLibrary = require('component-library')
    componentLibrary = require('../index.js');

var publicDir = path.format({dir: __dirname, base: 'public/component-library'});

gulp.task('clean', function() {
    return gulp.src(publicDir, {read: false})
        .pipe(clean({force: true}));
});

gulp.task('assets', ['clean'], function() {
    gulp.src([
        __dirname + '/assets/**/*'
    ])
    .pipe(gulp.dest(publicDir));
});

gulp.task('compile', ['assets'], function() {
    componentLibrary({
        templatesDir: path.format({dir: __dirname, base: 'templates'}),
        outputDir: publicDir,
        baseUrl: '/component-library/',
        js: [
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
            '/component-library/project.js'
        ],
        css: [
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css',
            'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css',
            '/component-library/project.css'
        ]
    });
});

gulp.task('watch', ['compile'], function() {
    gulp.watch(['templates/**/*', 'assets/**/*', '../views/**/*', '../sass/**/*', '../assets/**/*'], ['compile']);
});