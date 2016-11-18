import _ from 'lodash';
import assembleHtml from './assemblers/html.js';
import assembleSass from './assemblers/sass.js';
import assembleAssets from './assemblers/assets.js';
import path from 'path';
import nmResolve from 'node-modules-resolve';

module.exports = function(options) {
    _.defaults(options, {
        templatesDir: '',
        outputDir: '',
        baseUrl: '/',
        title: 'Component Library',
        js: [],
        css: [],
        favicon: {
            href: options.baseUrl + 'assets/favicons/favicon-32x32.png',
            rel: 'icon',
            type: 'image/component-library/favicons/png'
        }
    });

    assembleHtml(options);
    assembleSass(path.resolve(__dirname, '../sass/cl.scss'), path.resolve(options.outputDir, 'css/cl.css'));
    assembleAssets(path.resolve(__dirname, '../assets'), path.resolve(options.outputDir, 'assets'));
    assembleAssets(path.resolve(nmResolve('font-awesome'), 'fonts'), path.resolve(options.outputDir, 'fonts'));
};
