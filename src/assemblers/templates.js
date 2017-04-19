import _ from 'lodash';
import fs from 'fs';
import dirTree from 'directory-tree';
import path from 'path';
import writefile from 'writefile';
import nunjucks from 'nunjucks';
import hljs from 'highlight.js';
import cheerio from 'cheerio';

let nunjucksEnv;

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
            const params = _.extend({}, options, {
                tree: tree,
                current: item
            });

            const navigationHtml = nunjucksEnv.render('navigation.njk', params);
            const contentHtml = nunjucksEnv.render('content.njk', params);
            nunjucksEnv.opts.autoescape = false;
            const layoutHtml = nunjucksEnv.render(options.layout, {content: contentHtml});
            nunjucksEnv.opts.autoescape = true;

            const $ = cheerio.load(layoutHtml, {
                decodeEntities: false
            });
            const head = $('head');
            const body = $('body');

            head.prepend(nunjucksEnv.render('css.njk', params));

            if (head.find('title').length === 0) {
                head.prepend($('<title></title>').text(options.title));
            }

            _.forEach(options.css, function(cssLink) {
                head.append($('<link rel="stylesheet">').attr('href', cssLink));
            });

            if (head.find('meta[charset]').length === 0) {
                head.prepend('<meta charset="utf-8">');
            }

            if (head.find('link[rel=icon]').length === 0) {
                head.append($('<link />').attr('href', options.favicon.href)
                    .attr('rel', options.favicon.rel)
                    .attr('type', options.favicon.type));
            }

            body.prepend(navigationHtml);
            body.append(nunjucks.render('js.njk', params));

            _.forEach(options.js, function(jsLink) {
                body.append($('<script></script>').attr('src', jsLink));
            });

            writefile(outputPath, $.html(), function() {
                resolve();
            });
        })
    );

    return Promise.all(renderers);
}

export default function(inputDir, outputDir, options = {}) {
    options = _.defaults({}, options, {
        baseUrl: '/',
        title: 'Component Library',
        overview: 'Overview',
        search: 'Search',
        js: [],
        css: [],
        layout: path.join(__dirname, 'views/layout.njk'),
        favicon: {
            href: options.baseUrl + 'assets_/assets/favicons/favicon-32x32.png',
            rel: 'icon',
            type: 'image/component-library/favicons/png'
        }
    });

    nunjucksEnv = (new nunjucks.configure([path.join(__dirname, 'views'), '']))
        .addFilter('template', path => fs.readFileSync(path).toString())
        .addFilter('highlight', code => hljs.highlight('htmlbars', code, true, false).value);

    const patternsTree = dirTree(inputDir);
    patternsTree.name = options.overview;
    refineTree(patternsTree, inputDir);

    return compileTree(patternsTree, outputDir, patternsTree, options);
}