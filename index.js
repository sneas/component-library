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

    var patternsTree = dirTree(options.patternsDir);
    var jadeDir = jade.compile(fs.readFileSync(path.format({dir: __dirname, base: 'jade/dir.jade'})), {
        pretty: true
    });
    var index;

    (function refinePatternsTree(item, parent) {
        if (item.name === 'index.html') {
            item.name = parent.name;
            parent.index = item;
            _.remove(parent.children, item);
        } else {
            item.name = _.capitalize(_.replace(item.name.split('.').shift(), '-', ' '));
        }

        item.path = path.relative(options.patternsDir, item.path);
        _.each(item.children, child => refinePatternsTree(child, item));
    }(patternsTree));

    (function compile(item) {
        var outputPath = path.format({dir: options.outputDir, base: item.path});

        if (item.index) {
            compile(item.index);
        }

        if (item.children) {
            _.each(item.children, child => compile(child));
            return;
        }

        writefile(outputPath, jadeDir(
            {
                tree: patternsTree,
                baseUrl: options.baseUrl,
                current: item,
                templateHtml: fs.readFileSync(path.format({dir: options.patternsDir, base: item.path})),
                title: options.title
            }
        ));
    }(patternsTree));

    //Compile SASS
    sass.render({
        file: path.format({dir: __dirname, base: 'sass/ks.scss'})
    }, (err, result) => writefile(path.format({dir: options.outputDir, base: 'css/ks.css'}), result.css));
};