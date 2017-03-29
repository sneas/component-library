import _ from 'lodash';
import fs from 'fs';
import dirTree from 'directory-tree';
import path from 'path';
import writefile from 'writefile';
import nunjucks from 'nunjucks';
import hljs from 'highlight.js';

function refineTree(item, rootDir) {
    //Remove firsts numbers and extensions
    var prettyName = item.name.replace(/^\d+\./, '').split('.').shift().replace('-', ' ');
    item.name = _.capitalize(prettyName);
    item.relativePath = path.relative(rootDir, item.path);

    if (item.children) {
        item.relativePath += (item.relativePath ? '/' : '') +  'index.html';
    }

    _.each(item.children, function(child) {
        refineTree(child, rootDir)
    });
}

function compileTree(item, outputDir, tree, options = {}) {
    var outputPath = path.resolve(outputDir, item.relativePath);

    const renderers = [];

    if (item.children) {
        _.each(item.children, function(child) {
            renderers.push(compileTree(child, outputDir, tree, options));
        });
    }

    renderers.push(
        new Promise(function(resolve, reject) {
            nunjucks.render(
                'page.njk',
                _.extend({}, options, {
                    tree: tree,
                    current: item
                }),
                function(err, res) {
                    if (err) {
                        reject(err);
                    }

                    writefile(outputPath, res, function() {
                        resolve();
                    });
                }
            );
        })
    );

    return Promise.all(renderers);
}

export default function(inputDir, outputDir, options = {}) {
    options = _.defaults({}, options, {
        baseUrl: '/',
        title: 'Component Library',
        js: [],
        css: [],
        favicon: {
            href: options.baseUrl + '_assets/assets/favicons/favicon-32x32.png',
            rel: 'icon',
            type: 'image/component-library/favicons/png'
        }
    });

    (new nunjucks.configure(path.resolve(__dirname, 'views')))
        .addFilter('template', path => fs.readFileSync(path).toString())
        .addFilter('highlight', code => hljs.highlight('htmlbars', code, true, false).value);

    const patternsTree = dirTree(inputDir);
    patternsTree.name = 'Overview';
    refineTree(patternsTree, inputDir);

    return compileTree(patternsTree, outputDir, patternsTree, options);
}