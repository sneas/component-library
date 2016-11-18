import {expect} from 'chai';
import assembleAssets from '../assets.js';
import path from 'path';

describe('assets assembler', function() {
    it('should assemble assets', function(done) {

        let outputDir = path.resolve(__dirname, 'assets/_tmp/asserts');

        assembleAssets(path.resolve(__dirname, 'assets/input'),
            path.resolve(__dirname, 'assets/_tmp/asserts'))
            .then(function() {
                expect(outputDir).to.be.directory;
                done();
            });
    });
});