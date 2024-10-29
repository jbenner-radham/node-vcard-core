import { describe, it } from 'vitest';
import { expect } from 'chai';
import GeoProperty, { GeoRestConfig } from '../../lib/properties/GeoProperty.js';

describe('GeoProperty', () => {
    it('is a class', () => {
        expect(GeoProperty).to.be.a('class');
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
            const escapedValue = 'geo:37.386013\\,-122.082932';
            const geo = new GeoProperty(value);

            expect(geo.toString()).to.equal(`GEO:${escapedValue}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { type: 'work' as const };
            const value = 'geo:37.386013,-122.082932';
            const escapedValue = 'geo:37.386013\\,-122.082932';
            const geo = new GeoProperty(value, parameters);
            const actual = geo.toString();
            const expected = `GEO;TYPE=work:${escapedValue}`;

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'geo:37.386013,-122.082932';
            const options = { group: 'office' };
            const geo = new GeoProperty(value, parameters, options);

            expect(geo.toString()).to.equal('OFFICE.GEO:geo:37.386013\\,-122.082932');
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'geo:37.386013,-122.082932';
            const escapedValue = 'geo:37.386013\\,-122.082932';
            const geo = new GeoProperty(value, parameters);

            expect(geo.toString()).to.equal(`GEO;VALUE=uri:${escapedValue}`);
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

    describe('.from()', () => {
        it('is a static method', () => {
            expect(GeoProperty.from).to.be.a('function');
        });

        it('returns an instance of `GeoProperty`', () => {
            const geo = GeoProperty.from('geo:37.386013,-122.082932');

            expect(geo instanceof GeoProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const geo = new GeoProperty('geo:37.386013,-122.082932');

            expect(GeoProperty.from(geo) instanceof GeoProperty).to.equal(true);
        });

        it('creates an instance from a string value argument', () => {
            const geo = GeoProperty.from('geo:37.386013,-122.082932');

            expect(geo instanceof GeoProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'geo:37.386013,-122.082932';
            const config: GeoRestConfig = [value, { value: 'uri' }];
            const geo = GeoProperty.from(config);

            expect(geo instanceof GeoProperty).to.equal(true);
        });
    });
});
