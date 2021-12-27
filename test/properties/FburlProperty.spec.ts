import { expect } from 'chai';
import FburlProperty from '../../lib/properties/FburlProperty';

describe('FburlProperty', () => {
    it('is a function class', () => {
        expect(FburlProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(FburlProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const fburl = new FburlProperty('http://www.example.com/busy/janedoe');

            expect(fburl.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'http://www.example.com/busy/janedoe';
            const fburl = new FburlProperty(value);

            expect(fburl.toString()).to.equal(`FBURL:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(FburlProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const fburl = new FburlProperty('http://www.example.com/busy/janedoe');

            expect(fburl.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'http://www.example.com/busy/janedoe';
            const fburl = new FburlProperty(value);

            expect(fburl.valueOf()).to.equal(value);
        });
    });
});
