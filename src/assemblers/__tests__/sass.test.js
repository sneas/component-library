import chai, {expect} from 'chai';
import chaiFs from 'chai-fs';
import assembleSass from '../sass.js';
import path from 'path';

chai.use(chaiFs);

describe('sass assembler', function() {
    it('should successfully assemble sass', function(done) {
        const output = path.resolve(__dirname, 'sass/_tmp/good.scss');
        assembleSass(path.resolve(__dirname, 'sass/good.scss'), output)
            .then(function() {
                expect(output).to.be.file();
                done();
            });
    });

    it('should not assemble sass', function(done) {
        const output = path.resolve(__dirname, 'sass/_tmp/bad.scss');
        assembleSass(path.resolve(__dirname, 'sass/bad.scss'), output)
            .catch(function() {
                expect(output).to.not.be.a.path();
                done();
            });
    });
});