import { expect } from 'chai';
import TzProperty from '../../lib/properties/TzProperty';

describe('TzProperty', () => {
    it('is a function class', () => {
        expect(TzProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(TzProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const tz = new TzProperty('Raleigh/North America');

            expect(tz.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'Raleigh/North America';
            const tz = new TzProperty(value);

            expect(tz.toString()).to.equal(`TZ:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { pref: 1 };
            const value = 'Raleigh/North America';
            const config = { parameters, value };
            const tz = new TzProperty(config);
            const actual = tz.toString();
            const expected = 'TZ;PREF=1:Raleigh/North America';

            expect(actual).to.equal(expected);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'Raleigh/North America';
            const config = { parameters, value };
            const tz = new TzProperty(config);

            expect(tz.toString()).to.equal(`TZ;VALUE=text:${value}`);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'http://timezones.example.com/America/New_York'; // Find formal example to test.
            const config = { parameters, value };
            const tz = new TzProperty(config);

            expect(tz.toString()).to.equal(`TZ;VALUE=uri:${value}`);
        });

        it('accepts a "utc-offset" value parameter', () => {
            const parameters = { value: 'utc-offset' as const };
            const value = '-0500';
            const config = { parameters, value };
            const tz = new TzProperty(config);

            expect(tz.toString()).to.equal(`TZ;VALUE=utc-offset:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(TzProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const tz = new TzProperty('Raleigh/North America');

            expect(tz.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'Raleigh/North America';
            const tz = new TzProperty(value);

            expect(tz.valueOf()).to.equal(value);
        });
    });
});
