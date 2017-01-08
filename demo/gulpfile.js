var gulp = require('gulp'),
    path = require('path'),
    clean = require('gulp-clean'),
    //componentLibrary = require('component-library')
    componentLibrary = require('../dist/index.js');

var publicDir = path.join(__dirname, 'public/component-library');

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

gulp.task('compile', ['assets'], function(cb) {
    var templatesDir = path.join(__dirname, 'templates');
    componentLibrary(templatesDir, publicDir, {
        baseUrl: '/component-library/',
        js: [
            'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
            '/component-library/project.js'
        ],
        css: [
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css',
            'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css',
            '/component-library/project.css'
        ]
    }).then(function() {
        cb();
    }).catch(function(err) {
        cb(err);
    });
});

gulp.task('watch', ['compile'], function() {
    gulp.watch(['templates/**/*', 'assets/**/*', '../dist/assemblers/views/**/*', '../sass/**/*', '../assets/**/*'], ['compile']);
});