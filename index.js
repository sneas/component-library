var _ = require('lodash'),
    fs = require('fs'),
    jade = require('jade'),
    dirTree = require('directory-tree'),
    path = require('path'),
    writefile = require('writefile'),
    sass = require('node-sass'),
    gulp = require('gulp'),
    findNodeModules = require('find-node-modules');

module.exports = function(options) {
    _.defaults(options, {
        templatesDir: '',
        outputDir: '',
        baseUrl: '/',
        title: 'Component Library',
        js: [],
        css: []
    });
    
    if (options.favicon === undefined) {
        options.favicon = {
            href: options.baseUrl + 'favicons/favicon-32x32.png',
            rel: 'icon',
            type: 'image/component-library/favicons/png'
        };
    }

    var patternsTree = dirTree(options.templatesDir),
        pageFilePath = path.format({dir: __dirname, base: 'views/page.jade'}),
        page = jade.compile(fs.readFileSync(pageFilePath), {
            filename: pageFilePath,
            pretty: true
        });

    (function refinePatternsTree(item) {
        //Remove firsts numbers and extensions
        var prettyName = item.name.replace(/^\d+\./, '').split('.').shift().replace('-', ' ');
        item.name = _.capitalize(prettyName);
        item.path = path.relative(options.templatesDir, item.path);

        if (item.children) {
            item.path += (item.path ? '/' : '') +  'index.html';
        }

        _.each(item.children, function(child) {
            refinePatternsTree(child, item)
        });
    }(patternsTree));

    patternsTree.name = 'Overview';

    (function compile(item) {
        var outputPath = path.format({dir: options.outputDir, base: item.path});

        if (item.children) {
            _.each(item.children, function(child) {
                compile(child)
            });
        }

        writefile(outputPath, page(
            {
                tree: patternsTree,
                baseUrl: options.baseUrl,
                current: item,
                title: options.title,
                js: options.js,
                css: options.css,
                favicon: options.favicon,
                templateRender: function (templatePath) {
                    return fs.readFileSync(path.format({dir: options.templatesDir, base: templatePath}));
                }
            }
        ));
    }(patternsTree));

    //Compile SASS
    sass.render({
        includePaths: findNodeModules({cwd: './bootstrap-sass', relative: false}),
        file: path.format({dir: __dirname, base: 'sass/cl.scss'})
    }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            writefile(path.format({dir: options.outputDir, base: 'css/cl.css'}), result.css);
        }
    });

    //Copy assets
    gulp.src([
            __dirname + '/assets/**/*'
        ])
        .pipe(gulp.dest(options.outputDir));

    //Fonts
    gulp.src(__dirname + '/node_modules/font-awesome/fonts/**')
        .pipe(gulp.dest(path.format({dir: options.outputDir, base: 'fonts'})))
};
