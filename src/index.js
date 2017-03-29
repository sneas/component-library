import assembleTemplates from './assemblers/templates.js';
import assembleSass from './assemblers/sass.js';
import assembleAssets from './assemblers/assets.js';
import path from 'path';
import nmResolve from 'node-modules-resolve';

module.exports = function(templatesDir, outputDir, options = {}) {
    return Promise.all([
        assembleTemplates(templatesDir, outputDir, options),
        assembleSass(path.resolve(__dirname, '../sass/cl.scss'), path.join(outputDir, '_assets/css/cl.css')),
        assembleAssets(path.resolve(__dirname, '../assets'), path.join(outputDir, '_assets/assets')),
        assembleAssets(path.resolve(nmResolve('jquery'), 'dist'), path.join(outputDir, '_assets/jquery')),
        assembleAssets(path.resolve(nmResolve('bootstrap-sass-namespace'), 'assets/javascripts/bootstrap'), path.join(outputDir, '_assets/bootstrap-namespace')),
        assembleAssets(path.resolve(nmResolve('smartmenus-namespace'), 'dist'), path.join(outputDir, '_assets/smartmenus-namespace')),
        assembleAssets(path.resolve(nmResolve('font-awesome'), 'fonts'), path.join(outputDir, '_assets/fonts'))
    ]);
};
