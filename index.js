var _ = require('lodash'),
    fs = require('fs'),
    jade = require('jade'),
    dirTree = require('directory-tree'),
    path = require('path'),
    writefile = require('writefile'),
    sass = require('node-sass'),
    gulp = require('gulp');

module.exports = function(options) {
    _.defaults(options, {
        patternsDir: '',
        outputDir: '',
        baseUrl: '/',
        title: 'Kitchen Sink',
        js: [],
        css: []
    });

    var patternsTree = dirTree(options.patternsDir),
        pageFilePath = path.format({dir: __dirname, base: 'jade/page.jade'}),
        page = jade.compile(fs.readFileSync(pageFilePath), {
            filename: pageFilePath,
            pretty: true
        });

    (function refinePatternsTree(item) {
        //Remove firsts numbers and extensions
        var prettyName = item.name.replace(/^\d+\./, '').split('.').shift().replace('-', ' ');
        item.name = _.capitalize(prettyName);
        item.path = path.relative(options.patternsDir, item.path);

        if (item.children) {
            item.path += (item.path ? '/' : '') +  'index.html';
        }

        _.each(item.children, child => refinePatternsTree(child, item));
    }(patternsTree));

    patternsTree.name = 'Overview';

    (function compile(item) {
        var outputPath = path.format({dir: options.outputDir, base: item.path});

        if (item.children) {
            _.each(item.children, child => compile(child));
        }

        writefile(outputPath, page(
            {
                tree: patternsTree,
                baseUrl: options.baseUrl,
                current: item,
                title: options.title,
                js: options.js,
                css: options.css,
                templateRender: function (templatePath) {
                    return fs.readFileSync(path.format({dir: options.patternsDir, base: templatePath}));
                }
            }
        ));
    }(patternsTree));

    //Compile SASS
    sass.render({
            file: path.format({dir: __dirname, base: 'sass/ks.scss'})
        }, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                writefile(path.format({dir: options.outputDir, base: 'css/ks.css'}), result.css);
            }
        });

    //Copy assets
    gulp.src('assets/**/*')
        .pipe(gulp.dest(options.outputDir));
};