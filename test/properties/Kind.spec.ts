import { expect } from 'chai';
import Kind from '../../lib/properties/Kind';

describe('Kind', () => {
    it('is a function class', () => {
        expect(Kind).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(Kind.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const kind = new Kind('individual');

            expect(kind.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const kind = new Kind('individual');

            expect(kind.toString()).to.equal('KIND:individual');
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(Kind.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const kind = new Kind('individual');

            expect(kind.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'individual';
            const kind = new Kind(value);

            expect(kind.valueOf()).to.equal(value);
        });
    });
});
