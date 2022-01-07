import { expect } from 'chai';
import TelProperty from '../../lib/properties/TelProperty';

describe('TelProperty', () => {
    it('is a function class', () => {
        expect(TelProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(TelProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const tel = new TelProperty('+1-555-555-5555');

            expect(tel.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = '+1-555-555-5555';
            const tel = new TelProperty(value);

            expect(tel.toString()).to.equal(`TEL:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { pref: 1, type: 'voice' as const };
            const value = '+1-555-555-5555';
            const config = { parameters, value };
            const tel = new TelProperty(config);
            const actual = tel.toString();
            const expected = `TEL;PREF=1;TYPE=voice:${value}`;

            expect(actual).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(TelProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const tel = new TelProperty('...');

            expect(tel.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = '...';
            const tel = new TelProperty(value);

            expect(tel.valueOf()).to.equal(value);
        });
    });
});
