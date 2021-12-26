import { expect } from 'chai';
import AnniversaryProperty from '../../lib/properties/AnniversaryProperty';

describe('AnniversaryProperty', () => {
    it('is a function class', () => {
        expect(AnniversaryProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(AnniversaryProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const anniversary = new AnniversaryProperty('19960415');

            expect(anniversary.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = '19960415';
            const anniversary = new AnniversaryProperty(value);

            expect(anniversary.toString()).to.equal(`ANNIVERSARY:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(AnniversaryProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const anniversary = new AnniversaryProperty('19960415');

            expect(anniversary.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = '19960415';
            const anniversary = new AnniversaryProperty(value);

            expect(anniversary.valueOf()).to.equal(value);
        });
    });
});
