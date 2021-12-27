import { expect } from 'chai';
import CaluriProperty from '../../lib/properties/CaluriProperty';

describe('CaluriProperty', () => {
    it('is a function class', () => {
        expect(CaluriProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(CaluriProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const caluri = new CaluriProperty('http://cal.example.com/calA');

            expect(caluri.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'http://cal.example.com/calA';
            const caluri = new CaluriProperty(value);

            expect(caluri.toString()).to.equal(`CALURI:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(CaluriProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const caluri = new CaluriProperty('http://cal.example.com/calA');

            expect(caluri.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'http://cal.example.com/calA';
            const caluri = new CaluriProperty(value);

            expect(caluri.valueOf()).to.equal(value);
        });
    });
});
