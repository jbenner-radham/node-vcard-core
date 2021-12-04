import { expect } from 'chai';
import KindProperty from '../../lib/properties/KindProperty';

describe('KindProperty', () => {
    it('is a function class', () => {
        expect(KindProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(KindProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const kind = new KindProperty('individual');

            expect(kind.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const kind = new KindProperty('individual');

            expect(kind.toString()).to.equal('KIND:individual');
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(KindProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const kind = new KindProperty('individual');

            expect(kind.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'individual';
            const kind = new KindProperty(value);

            expect(kind.valueOf()).to.equal(value);
        });
    });
});
