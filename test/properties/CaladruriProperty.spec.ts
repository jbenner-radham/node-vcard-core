import { expect } from 'chai';
import CaladruriProperty from '../../lib/properties/CaladruriProperty';

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
            const config = { parameters, value };
            const caladruri = new CaladruriProperty(config);
            const actual = caladruri.toString();
            const expected = `CALADRURI;TYPE=home:${value}`;

            expect(actual).to.equal(expected);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'http://example.com/calendar/jdoe';
            const config = { parameters, value };
            const caladruri = new CaladruriProperty(config);

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
});
