import { expect } from 'chai';
import KeyProperty, { KeyPropertyRestConfig } from '../../lib/properties/KeyProperty';

describe('KeyProperty', () => {
    it('is a class', () => {
        expect(KeyProperty).to.be.a('class');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(KeyProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const key = new KeyProperty('http://www.example.com/keys/jdoe.cer');

            expect(key.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'http://www.example.com/keys/jdoe.cer';
            const key = new KeyProperty(value);

            expect(key.toString()).to.equal(`KEY:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { mediatype: 'application/pgp-keys' };
            const value = 'ftp://example.com/keys/jdoe';
            const key = new KeyProperty(value, parameters);
            const actual = key.toString();
            const expected = `KEY;MEDIATYPE=application/pgp-keys:${value}`;

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'http://www.example.com/keys/jdoe.cer';
            const options = { group: 1 };
            const key = new KeyProperty(value, parameters, options);

            expect(key.toString()).to.equal(`1.KEY:${value}`);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'http://www.example.com/keys/jdoe.cer';
            const key = new KeyProperty(value, parameters);

            expect(key.toString()).to.equal(`KEY;VALUE=uri:${value}`);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = '???'; /** @todo Need to find proper text example to test! */
            const key = new KeyProperty(value, parameters);

            expect(key.toString()).to.equal(`KEY;VALUE=text:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(KeyProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const key = new KeyProperty('http://www.example.com/keys/jdoe.cer');

            expect(key.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'http://www.example.com/keys/jdoe.cer';
            const key = new KeyProperty(value);

            expect(key.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(KeyProperty.factory).to.be.a('function');
        });

        it('returns an instance of `KeyProperty`', () => {
            const key = KeyProperty.factory('http://www.example.com/keys/jdoe.cer');

            expect(key instanceof KeyProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const key = new KeyProperty('http://www.example.com/keys/jdoe.cer');

            expect(KeyProperty.factory(key) instanceof KeyProperty).to.equal(true);
        });

        it('creates an instance from a string value argument', () => {
            const key = KeyProperty.factory('http://www.example.com/keys/jdoe.cer');

            expect(key instanceof KeyProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'http://www.example.com/keys/jdoe.cer';
            const config: KeyPropertyRestConfig = [value, { value: 'uri' }];
            const key = KeyProperty.factory(config);

            expect(key instanceof KeyProperty).to.equal(true);
        });
    });
});
