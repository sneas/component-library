import chai, {expect} from 'chai';
import chaiFs from 'chai-fs';
import assembleTemplates from '../templates.js';
import path from 'path';
import cheerio from 'cheerio';
import fs from 'fs';

chai.use(chaiFs);

describe('templates assembler', function() {
    it('should successfully assemble templates', function(done) {
        const inputDir = path.join(__dirname, 'templates/input');
        const outputDir = path.join(__dirname, 'templates/_tmp/output');
        assembleTemplates(inputDir, outputDir).then(function() {
            const overviewFile = path.join(outputDir, 'index.html');
            expect(outputDir).to.be.directory('Output templates dir has been created');
            expect(overviewFile).to.be.file('Overview file has been generated');

            const $ = cheerio.load(fs.readFileSync(overviewFile, 'utf8'), {
                normalizeWhitespace: true
            });
            expect($('.cl-node-header.cl-bs-html-h1').text().trim()).to.be.equal('Overview');
            done();
        });
    });

    it('should set custom overview lable', function(done) {
        const inputDir = path.join(__dirname, 'templates/input');
        const outputDir = path.join(__dirname, 'templates/_tmp/output');
        assembleTemplates(inputDir, outputDir, {
            overview: 'Outline'
        }).then(function() {
            const overviewFile = path.join(outputDir, 'index.html');
            const $ = cheerio.load(fs.readFileSync(overviewFile, 'utf8'), {
                normalizeWhitespace: true
            });
            expect($('.cl-node-header.cl-bs-html-h1').text().trim()).to.be.equal('Outline');
            expect($('#cl-search').attr('placeholder')).to.be.equal('Search');
            done();
        });
    });

    it('should set custom search placeholder', function(done) {
        const inputDir = path.join(__dirname, 'templates/input');
        const outputDir = path.join(__dirname, 'templates/_tmp/output');
        assembleTemplates(inputDir, outputDir, {
            search: 'Find'
        }).then(function() {
            const overviewFile = path.join(outputDir, 'index.html');
            const $ = cheerio.load(fs.readFileSync(overviewFile, 'utf8'), {
                normalizeWhitespace: true
            });
            expect($('#cl-search').attr('placeholder')).to.be.equal('Find');
            done();
        });
    });
});