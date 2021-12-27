import { expect } from 'chai';
import KeyProperty from '../../lib/properties/KeyProperty';

describe('KeyProperty', () => {
    it('is a function class', () => {
        expect(KeyProperty).to.be.a('function');
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
});
