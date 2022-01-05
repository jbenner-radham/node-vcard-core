import { expect } from 'chai';
import UrlProperty from '../../lib/properties/UrlProperty';

describe('UrlProperty', () => {
    it('is a function class', () => {
        expect(UrlProperty).to.be.a('function');
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
            const config = { parameters, value };
            const url = new UrlProperty(config);
            const actual = url.toString();
            const expected = `URL;TYPE=work:${value}`;

            expect(actual).to.equal(expected);
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
});
