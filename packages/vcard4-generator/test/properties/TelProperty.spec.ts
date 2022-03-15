import { expect } from 'chai';
import TelProperty, { TelPropertyConfig } from '../../lib/properties/TelProperty';

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
            const tel = new TelProperty(value, parameters);
            const actual = tel.toString();
            const expected = `TEL;PREF=1;TYPE=voice:${value}`;

            expect(actual).to.equal(expected);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = '+1-555-555-5555';
            const tel = new TelProperty(value, parameters);

            expect(tel.toString()).to.equal(`TEL;VALUE=text:${value}`);
        });

        it('accepts a multi-value "type" parameter', () => {
            const type = ['home' as const, 'voice' as const];
            const parameters = { pref: 1, type, value: 'uri' as const };
            const value = 'tel:+1-555-555-5555;ext=5555';
            const tel = new TelProperty(value, parameters);

            expect(tel.toString()).to.equal(`TEL;PREF=1;TYPE="home,voice";VALUE=uri:${value}`);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'tel:+1-555-555-5555;ext=5555';
            const tel = new TelProperty(value, parameters);

            expect(tel.toString()).to.equal(`TEL;VALUE=uri:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(TelProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const tel = new TelProperty('+1-555-555-5555');

            expect(tel.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = '+1-555-555-5555';
            const tel = new TelProperty(value);

            expect(tel.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(TelProperty.factory).to.be.a('function');
        });

        it('returns an instance of `TelProperty`', () => {
            const tel = TelProperty.factory('+1-555-555-5555');

            expect(tel instanceof TelProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const tel = new TelProperty('+1-555-555-5555');

            expect(TelProperty.factory(tel)).to.equal(tel);
        });

        it('creates an instance from a string value argument', () => {
            const tel = TelProperty.factory('+1-555-555-5555');

            expect(tel instanceof TelProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = '+1-555-555-5555';
            const config: TelPropertyConfig = [value, { type: 'home' }];
            const tel = TelProperty.factory(config);

            expect(tel instanceof TelProperty).to.equal(true);
        });
    });
});
