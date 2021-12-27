import { expect } from 'chai';
import ImppProperty from '../../lib/properties/ImppProperty';

describe('ImppProperty', () => {
    it('is a function class', () => {
        expect(ImppProperty).to.be.a('function');
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
});
