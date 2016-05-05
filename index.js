var _ = require('lodash'),
    fs = require('fs'),
    jade = require('jade'),
    dirTree = require('directory-tree'),
    path = require('path'),
    writefile = require('writefile'),
    sass = require('node-sass');

module.exports = function(options) {
    _.defaults(options, {
        patternsDir: '',
        outputDir: '',
        baseUrl: '/',
        title: 'Kitchen Sink'
    });

    var patternsTree = dirTree(options.patternsDir),
        pageFilePath = path.format({dir: __dirname, base: 'jade/page.jade'}),
        page = jade.compile(fs.readFileSync(pageFilePath), {
            filename: pageFilePath,
            pretty: true
        });

    (function refinePatternsTree(item, parent) {
        item.name = _.capitalize(_.replace(item.name.split('.').shift(), '-', ' '));
        item.path = path.relative(options.patternsDir, item.path);

        if (item.children) {
            item.path += '/index.html';
        }

        _.each(item.children, child => refinePatternsTree(child, item));
    }(patternsTree));

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
                templateRender: function (templatePath) {
                    return fs.readFileSync(path.format({dir: options.patternsDir, base: templatePath}));
                }
            }
        ));
    }(patternsTree));

    //Compile SASS
    sass.render({
        file: path.format({dir: __dirname, base: 'sass/ks.scss'})
    }, (err, result) => writefile(path.format({dir: options.outputDir, base: 'css/ks.css'}), result.css));
};