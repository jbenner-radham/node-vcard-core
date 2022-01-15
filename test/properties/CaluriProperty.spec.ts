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

        it('correctly returns parameters', () => {
            const parameters = { mediatype: 'text/calendar' };
            const value = 'ftp://ftp.example.com/calA.ics';
            const config = { parameters, value };
            const caluri = new CaluriProperty(config);
            const actual = caluri.toString();
            const expected = 'CALURI;MEDIATYPE=text/calendar:ftp://ftp.example.com/calA.ics';

            expect(actual).to.equal(expected);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'http://cal.example.com/calA';
            const config = { parameters, value };
            const caluri = new CaluriProperty(config);

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
});
