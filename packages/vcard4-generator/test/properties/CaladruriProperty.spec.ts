import { describe, it } from 'vitest';
import { expect } from 'chai';
import CaladruriProperty, { type CaladruriRestConfig } from '../../lib/properties/CaladruriProperty.js';

describe('CaladruriProperty', () => {
    it('is a class', () => {
        expect(CaladruriProperty).to.be.a('class');
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

        it('correctly adds a pref to the property', () => {
            const parameters = { pref: 1 };
            const value = 'mailto:janedoe@example.com';
            const caladruri = new CaladruriProperty(value, parameters);
            const actual = caladruri.toString();
            const expected = `CALADRURI;PREF=1:${value}`;

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'http://example.com/calendar/jdoe';
            const options = { group: 1 };
            const caladruri = new CaladruriProperty(value, parameters, options);

            expect(caladruri.toString()).to.equal(`1.CALADRURI:${value}`);
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

    describe('.from()', () => {
        it('is a static method', () => {
            expect(CaladruriProperty.from).to.be.a('function');
        });

        it('returns an instance of `CaladruriProperty`', () => {
            const caladruri = CaladruriProperty.from('http://example.com/calendar/jdoe');

            expect(caladruri instanceof CaladruriProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const caladruri = new CaladruriProperty('http://example.com/calendar/jdoe');

            expect(CaladruriProperty.from(caladruri) instanceof CaladruriProperty).to.equal(true);
        });

        it('creates an instance from a string value argument', () => {
            const caladruri = CaladruriProperty.from('http://example.com/calendar/jdoe');

            expect(caladruri instanceof CaladruriProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'http://example.com/calendar/jdoe';
            const config: CaladruriRestConfig = [value, { type: 'home' }];
            const caladruri = CaladruriProperty.from(config);

            expect(caladruri instanceof CaladruriProperty).to.equal(true);
        });
    });
});
