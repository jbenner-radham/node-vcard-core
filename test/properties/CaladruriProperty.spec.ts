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
