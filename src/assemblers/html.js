import _ from 'lodash';
import fs from 'fs';
import dirTree from 'directory-tree';
import path from 'path';
import writefile from 'writefile';
import nunjucks from 'nunjucks';

export default function(options) {
    var patternsTree = dirTree(options.templatesDir);

    var env = new nunjucks.configure(path.resolve(__dirname, 'html'));

    env.addFilter('template', function(path) {
        return fs.readFileSync(path);
    });

    (function refinePatternsTree(item) {
        //Remove firsts numbers and extensions
        var prettyName = item.name.replace(/^\d+\./, '').split('.').shift().replace('-', ' ');
        item.name = _.capitalize(prettyName);
        item.relativePath = path.relative(options.templatesDir, item.path);

        if (item.children) {
            item.relativePath += (item.relativePath ? '/' : '') +  'index.html';
        }

        _.each(item.children, function(child) {
            refinePatternsTree(child, item)
        });
    }(patternsTree));

    patternsTree.name = 'Overview';

    (function compile(item) {
        var outputPath = path.resolve(options.outputDir, item.relativePath);

        if (item.children) {
            _.each(item.children, function(child) {
                compile(child)
            });
        }

        writefile(outputPath, nunjucks.render(
            'page.njk',
            {
                tree: patternsTree,
                baseUrl: options.baseUrl,
                current: item,
                title: options.title,
                js: options.js,
                css: options.css,
                favicon: options.favicon
            }
        ));
    }(patternsTree));
}