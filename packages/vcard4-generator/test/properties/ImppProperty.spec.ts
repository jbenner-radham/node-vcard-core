import { describe, it } from 'vitest';
import { expect } from 'chai';
import ImppProperty, { ImppRestConfig } from '../../lib/properties/ImppProperty.js';

describe('ImppProperty', () => {
    it('is a class', () => {
        expect(ImppProperty).to.be.a('class');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(ImppProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const impp = new ImppProperty('xmpp:alice@example.com');

            expect(impp.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'xmpp:alice@example.com';
            const impp = new ImppProperty(value);

            expect(impp.toString()).to.equal(`IMPP:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { pref: 1 };
            const value = 'xmpp:alice@example.com';
            const impp = new ImppProperty(value, parameters);
            const actual = impp.toString();
            const expected = `IMPP;PREF=1:${value}`;

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'xmpp:alice@example.com';
            const options = { group: 1 };
            const impp = new ImppProperty(value, parameters, options);

            expect(impp.toString()).to.equal(`1.IMPP:${value}`);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'xmpp:alice@example.com';
            const impp = new ImppProperty(value, parameters);

            expect(impp.toString()).to.equal(`IMPP;VALUE=uri:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(ImppProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const impp = new ImppProperty('xmpp:alice@example.com');

            expect(impp.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'xmpp:alice@example.com';
            const impp = new ImppProperty(value);

            expect(impp.valueOf()).to.equal(value);
        });
    });

    describe('.from()', () => {
        it('is a static method', () => {
            expect(ImppProperty.from).to.be.a('function');
        });

        it('returns an instance of `ImppProperty`', () => {
            const impp = ImppProperty.from('xmpp:alice@example.com');

            expect(impp instanceof ImppProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const impp = new ImppProperty('xmpp:alice@example.com');

            expect(ImppProperty.from(impp) instanceof ImppProperty).to.equal(true);
        });

        it('creates an instance from a string value argument', () => {
            const impp = ImppProperty.from('xmpp:alice@example.com');

            expect(impp instanceof ImppProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'xmpp:alice@example.com';
            const config: ImppRestConfig = [value, { value: 'uri' }];
            const impp = ImppProperty.from(config);

            expect(impp instanceof ImppProperty).to.equal(true);
        });
    });
});
