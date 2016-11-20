import assembleTemplates from './assemblers/templates.js';
import assembleSass from './assemblers/sass.js';
import assembleAssets from './assemblers/assets.js';
import path from 'path';
import nmResolve from 'node-modules-resolve';

module.exports = function(templatesDir, outputDir, options = {}) {
    return Promise.all([
        assembleTemplates(templatesDir, outputDir, options),
        assembleSass(path.resolve(__dirname, '../sass/cl.scss'), path.resolve(outputDir, 'css/cl.css')),
        assembleAssets(path.resolve(__dirname, '../assets'), path.resolve(outputDir, 'assets')),
        assembleAssets(path.resolve(nmResolve('font-awesome'), 'fonts'), path.resolve(outputDir, 'fonts'))
    ]);
};
