import assembleTemplates from './assemblers/templates.js';
import assembleSass from './assemblers/sass.js';
import assembleAssets from './assemblers/assets.js';
import path from 'path';
import nmResolve from 'node-modules-resolve';

module.exports = function(templatesDir, outputDir, options = {}) {
    return Promise.all([
        assembleTemplates(templatesDir, outputDir, options),
        assembleSass(path.resolve(__dirname, '../sass/cl.scss'), path.join(outputDir, 'assets_/css/cl.css')),
        assembleAssets(path.resolve(__dirname, '../assets'), path.join(outputDir, 'assets_/assets')),
        assembleAssets(path.resolve(nmResolve('jquery'), 'dist'), path.join(outputDir, 'assets_/jquery')),
        assembleAssets(path.resolve(nmResolve('bootstrap-sass-namespace'), 'assets/javascripts/bootstrap'), path.join(outputDir, 'assets_/bootstrap-namespace')),
        assembleAssets(path.resolve(nmResolve('smartmenus-namespace'), 'dist'), path.join(outputDir, 'assets_/smartmenus-namespace')),
        assembleAssets(path.resolve(nmResolve('font-awesome'), 'fonts'), path.join(outputDir, 'assets_/fonts'))
    ]);
};
