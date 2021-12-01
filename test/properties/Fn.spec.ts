import { expect } from 'chai';
import Fn from '../../lib/properties/Fn';

describe('Fn', () => {
    it('is a function class', () => {
        expect(Fn).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(Fn.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const fn = new Fn('John');

            expect(fn.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const fn = new Fn('Zaxxon');

            expect(fn.toString()).to.equal('FN:Zaxxon');
        });
    });
});
