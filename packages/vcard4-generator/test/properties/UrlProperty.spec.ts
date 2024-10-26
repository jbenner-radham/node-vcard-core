import { describe, it } from 'vitest';
import { expect } from 'chai';
import UrlProperty, { type UrlPropertyRestConfig } from '../../lib/properties/UrlProperty.js';

describe('UrlProperty', () => {
    it('is a class', () => {
        expect(UrlProperty).to.be.a('class');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(UrlProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const url = new UrlProperty('http://www.example.com/');

            expect(url.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'http://www.example.com/';
            const url = new UrlProperty(value);

            expect(url.toString()).to.equal(`URL:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { type: 'work' as const };
            const value = 'http://example.org/restaurant.french/~chezchic.html';
            const url = new UrlProperty(value, parameters);
            const actual = url.toString();
            const expected = `URL;TYPE=work:${value}`;

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'http://company.example.com/';
            const options = { group: 'office' };
            const url = new UrlProperty(value, parameters, options);

            expect(url.toString()).to.equal(`OFFICE.URL:${value}`);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'http://example.org/restaurant.french/~chezchic.html';
            const url = new UrlProperty(value, parameters);

            expect(url.toString()).to.equal(`URL;VALUE=uri:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(UrlProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const url = new UrlProperty('http://www.example.com/');

            expect(url.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'http://www.example.com/';
            const url = new UrlProperty(value);

            expect(url.valueOf()).to.equal(value);
        });
    });

    describe('#validate()', () => {
        it('is a method', () => {
            expect(UrlProperty.prototype.validate).to.be.a('function');
        });

        it('returns undefined', () => {
            const url = new UrlProperty('http://example.com/');

            expect(url.validate('http://example.com/')).to.equal(undefined);
        });

        it('does not throw when passed a valid URL', () => {
            const url = new UrlProperty('http://example.com/');

            expect(() => url.validate('http://example.com/')).not.to.throw();
        });

        // Disabling this for now because of the following from https://www.chaijs.com/:
        // > Due to limitations in ES5, `.throw` may not always work as expected
        // > when using a transpiler such as Babel or TypeScript.
        it.skip('throws when passed an invalid URL', () => {
            const url = new UrlProperty('example.com');

            expect(() => url.validate('example.com')).to.throw();
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(UrlProperty.factory).to.be.a('function');
        });

        it('returns an instance of `UrlProperty`', () => {
            const url = UrlProperty.factory('http://www.example.com/');

            expect(url instanceof UrlProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const url = new UrlProperty('http://www.example.com/');

            expect(UrlProperty.factory(url)).to.equal(url);
        });

        it('creates an instance from a string value argument', () => {
            const url = UrlProperty.factory('http://www.example.com/');

            expect(url instanceof UrlProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'http://www.example.com/';
            const config: UrlPropertyRestConfig = [value, { type: 'home' }];
            const url = UrlProperty.factory(config);

            expect(url instanceof UrlProperty).to.equal(true);
        });
    });
});
