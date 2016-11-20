import chai, {expect} from 'chai';
import chaiFs from 'chai-fs';
import assembleTemplates from '../templates.js';
import path from 'path';

chai.use(chaiFs);

describe('templates assembler', function() {
    it('should successfully assemble templates', function(done) {
        const inputDir = path.join(__dirname, 'templates/input');
        const outputDir = path.join(__dirname, 'templates/_tmp/output');
        assembleTemplates(inputDir, outputDir).then(function() {
            expect(outputDir).to.be.directory();
            done();
        });
    });
});