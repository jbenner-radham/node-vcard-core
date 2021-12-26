import { expect } from 'chai';
import BdayProperty from '../../lib/properties/BdayProperty';

describe('BdayProperty', () => {
    it('is a function class', () => {
        expect(BdayProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(BdayProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const bday = new BdayProperty('--0415');

            expect(bday.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = '--0415';
            const bday = new BdayProperty(value);

            expect(bday.toString()).to.equal(`BDAY:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(BdayProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const bday = new BdayProperty('19531015T231000Z');

            expect(bday.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = '19531015T231000Z';
            const bday = new BdayProperty(value);

            expect(bday.valueOf()).to.equal(value);
        });
    });
});
