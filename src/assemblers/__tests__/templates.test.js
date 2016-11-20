import chai, {expect} from 'chai';
import chaiFs from 'chai-fs';
import assembleTemplates from '../templates.js';
import path from 'path';
import cheerio from 'cheerio';
import fs from 'fs';

chai.use(chaiFs);

describe('templates assembler', function() {
    this.timeout(15000);

    it('should successfully assemble templates', function(done) {
        const inputDir = path.join(__dirname, 'templates/input');
        const outputDir = path.join(__dirname, 'templates/_tmp/output');
        assembleTemplates(inputDir, outputDir).then(function() {
            const overviewFile = path.join(outputDir, 'index.html');
            expect(outputDir).to.be.directory('Output templates dir has been created');
            expect(overviewFile).to.be.file('Overview file has been generated');
            fs.readFile(overviewFile, 'utf8', function(err, data) {
                if (err) {
                    return done(err);
                }

                const $ = cheerio.load(data, {
                    normalizeWhitespace: true
                });

                expect($('.cl-node-header.h1').text().trim()).to.be.equal('Overview');

                done();
            });
        });
    });
});