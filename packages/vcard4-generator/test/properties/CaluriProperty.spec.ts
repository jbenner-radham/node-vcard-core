import { expect } from 'chai';
import CaluriProperty, { CaluriPropertyRestConfig } from '../../lib/properties/CaluriProperty';

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

        it('correctly returns parameters', () => {
            const parameters = { mediatype: 'text/calendar' };
            const value = 'ftp://ftp.example.com/calA.ics';
            const caluri = new CaluriProperty(value, parameters);
            const actual = caluri.toString();
            const expected = 'CALURI;MEDIATYPE=text/calendar:ftp://ftp.example.com/calA.ics';

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'http://cal.example.com/calA';
            const options = { group: 1 };
            const caluri = new CaluriProperty(value, parameters, options);

            expect(caluri.toString()).to.equal(`1.CALURI:${value}`);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'http://cal.example.com/calA';
            const caluri = new CaluriProperty(value, parameters);

            expect(caluri.toString()).to.equal(`CALURI;VALUE=uri:${value}`);
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

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(CaluriProperty.factory).to.be.a('function');
        });

        it('returns an instance of `CaluriProperty`', () => {
            const caluri = CaluriProperty.factory('http://cal.example.com/calA');

            expect(caluri instanceof CaluriProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const caluri = new CaluriProperty('http://cal.example.com/calA');

            expect(CaluriProperty.factory(caluri) instanceof CaluriProperty).to.equal(true);
        });

        it('creates an instance from a string value argument', () => {
            const caluri = CaluriProperty.factory('http://cal.example.com/calA');

            expect(caluri instanceof CaluriProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'http://cal.example.com/calA';
            const config: CaluriPropertyRestConfig = [value, { type: 'home' }];
            const caluri = CaluriProperty.factory(config);

            expect(caluri instanceof CaluriProperty).to.equal(true);
        });
    });
});
