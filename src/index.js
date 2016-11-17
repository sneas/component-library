import _ from 'lodash';
import htmlAssembler from './assemblers/html.js';
import sassAssembler from './assemblers/sass.js';
import iconsAssembler from './assemblers/icons.js';
import assetsAssembler from './assemblers/assets.js';

module.exports = function(options) {
    _.defaults(options, {
        templatesDir: '',
        outputDir: '',
        baseUrl: '/',
        title: 'Component Library',
        js: [],
        css: [],
        favicon: {
            href: options.baseUrl + 'favicons/favicon-32x32.png',
            rel: 'icon',
            type: 'image/component-library/favicons/png'
        }
    });


    htmlAssembler(options);
    sassAssembler(options);
    iconsAssembler(options);
    assetsAssembler(options);
};
