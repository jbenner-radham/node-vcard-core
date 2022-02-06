import { expect } from 'chai';
import CaladruriProperty, { CaladruriPropertyConfig } from '../../lib/properties/CaladruriProperty';

describe('CaladruriProperty', () => {
    it('is a function class', () => {
        expect(CaladruriProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(CaladruriProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const caladruri = new CaladruriProperty('http://example.com/calendar/jdoe');

            expect(caladruri.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'http://example.com/calendar/jdoe';
            const caladruri = new CaladruriProperty(value);

            expect(caladruri.toString()).to.equal(`CALADRURI:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { type: 'home' as const };
            const value = 'http://example.com/calendar/jdoe';
            const caladruri = new CaladruriProperty(value, parameters);
            const actual = caladruri.toString();
            const expected = `CALADRURI;TYPE=home:${value}`;

            expect(actual).to.equal(expected);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'http://example.com/calendar/jdoe';
            const caladruri = new CaladruriProperty(value, parameters);

            expect(caladruri.toString()).to.equal(`CALADRURI;VALUE=uri:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(CaladruriProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const caladruri = new CaladruriProperty('http://example.com/calendar/jdoe');

            expect(caladruri.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'http://example.com/calendar/jdoe';
            const caladruri = new CaladruriProperty(value);

            expect(caladruri.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(CaladruriProperty.factory).to.be.a('function');
        });

        it('returns an instance of `CaladruriProperty`', () => {
            const caladruri = CaladruriProperty.factory('http://example.com/calendar/jdoe');

            expect(caladruri instanceof CaladruriProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const caladruri = new CaladruriProperty('http://example.com/calendar/jdoe');

            expect(CaladruriProperty.factory(caladruri) instanceof CaladruriProperty).to.equal(true);
        });

        it('creates an instance from a string value argument', () => {
            const caladruri = CaladruriProperty.factory('http://example.com/calendar/jdoe');

            expect(caladruri instanceof CaladruriProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'http://example.com/calendar/jdoe';
            const config: CaladruriPropertyConfig = [value, { type: 'home' }];
            const caladruri = CaladruriProperty.factory(config);

            expect(caladruri instanceof CaladruriProperty).to.equal(true);
        });
    });
});
