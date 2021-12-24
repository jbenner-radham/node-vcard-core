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
});
