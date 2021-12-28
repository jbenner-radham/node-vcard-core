import { expect } from 'chai';
import ProdidProperty from '../../lib/properties/ProdidProperty';

describe('ProdidProperty', () => {
    it('is a function class', () => {
        expect(ProdidProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(ProdidProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const prodid = new ProdidProperty('-//ONLINE DIRECTORY//NONSGML Version 1//EN');

            expect(prodid.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = '-//ONLINE DIRECTORY//NONSGML Version 1//EN';
            const prodid = new ProdidProperty(value);

            expect(prodid.toString()).to.equal(`PRODID:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(ProdidProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const prodid = new ProdidProperty('-//ONLINE DIRECTORY//NONSGML Version 1//EN');

            expect(prodid.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = '-//ONLINE DIRECTORY//NONSGML Version 1//EN';
            const prodid = new ProdidProperty(value);

            expect(prodid.valueOf()).to.equal(value);
        });
    });
});
