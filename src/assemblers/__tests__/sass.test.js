import chai, {expect} from 'chai';
import chaiFs from 'chai-fs';
import assembleSass from '../sass.js';
import path from 'path';

chai.use(chaiFs);

describe('sass assembler', function() {
    it('should successfully assemble sass', function(done) {
        const output = path.resolve(__dirname, 'sass/_tmp/good.scss');
        assembleSass(path.resolve(__dirname, 'sass/input/good.scss'), output)
            .then(function() {
                expect(output).to.be.file('Valid SCSS file has been compile');
                done();
            });
    });

    it('should not assemble sass', function(done) {
        const output = path.resolve(__dirname, 'sass/_tmp/bad.scss');
        assembleSass(path.resolve(__dirname, 'sass/input/bad.scss'), output)
            .catch(function() {
                expect(output).to.not.be.a.path('Erroneous SCSS file has not been compiled. Promise rejected');
                done();
            });
    });
});