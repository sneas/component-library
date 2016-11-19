import chai, {expect} from 'chai';
import chaiFs from 'chai-fs';
import assembleAssets from '../assets.js';
import path from 'path';

chai.use(chaiFs);

describe('assets assembler', function() {
    it('should assemble assets', function(done) {
        const outputDir = path.join(__dirname, 'assets/_tmp/asserts');
        assembleAssets(path.join(__dirname, 'assets/input'),
            path.join(__dirname, 'assets/_tmp/asserts'))
            .then(function() {
                expect(outputDir).to.be.directory();
                expect(path.join(outputDir, 'test-asset.txt')).to.be.file();
                expect(path.join(outputDir, 'folder/another-asset.txt')).to.be.file();

                done();
            });
    });
});