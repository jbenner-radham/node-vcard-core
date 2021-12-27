import { expect } from 'chai';
import GeoProperty from '../../lib/properties/GeoProperty';

describe('GeoProperty', () => {
    it('is a function class', () => {
        expect(GeoProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(GeoProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const geo = new GeoProperty('geo:37.386013,-122.082932');

            expect(geo.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'geo:37.386013,-122.082932';
            const geo = new GeoProperty(value);

            expect(geo.toString()).to.equal(`GEO:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(GeoProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const geo = new GeoProperty('geo:37.386013,-122.082932');

            expect(geo.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'geo:37.386013,-122.082932';
            const geo = new GeoProperty(value);

            expect(geo.valueOf()).to.equal(value);
        });
    });
});
