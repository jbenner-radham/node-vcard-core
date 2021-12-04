import { expect } from 'chai';
import FnProperty from '../../lib/properties/FnProperty';

describe('FnProperty', () => {
    it('is a function class', () => {
        expect(FnProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(FnProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const fn = new FnProperty('John');

            expect(fn.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const fn = new FnProperty('Zaxxon');

            expect(fn.toString()).to.equal('FN:Zaxxon');
        });
    });
});
