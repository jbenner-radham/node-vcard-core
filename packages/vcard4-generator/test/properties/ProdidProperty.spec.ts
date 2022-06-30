import { expect } from 'chai';
import ProdidProperty, { ProdidPropertyRestConfig } from '../../lib/properties/ProdidProperty';

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

        it('accepts an object argument to the constructor', () => {
            const value = '-//ONLINE DIRECTORY//NONSGML Version 1//EN';
            const prodid = new ProdidProperty(value);
            const actual = prodid.toString();
            const expected = `PRODID:${value}`;

            expect(actual).to.equal(expected);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = '-//ONLINE DIRECTORY//NONSGML Version 1//EN';
            const prodid = new ProdidProperty(value, parameters);

            expect(prodid.toString()).to.equal(`PRODID;VALUE=text:${value}`);
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

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(ProdidProperty.factory).to.be.a('function');
        });

        it('returns an instance of `ProdidProperty`', () => {
            const prodid = ProdidProperty.factory('-//ONLINE DIRECTORY//NONSGML Version 1//EN');

            expect(prodid instanceof ProdidProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const prodid = new ProdidProperty('-//ONLINE DIRECTORY//NONSGML Version 1//EN');

            expect(ProdidProperty.factory(prodid)).to.equal(prodid);
        });

        it('creates an instance from a string value argument', () => {
            const prodid = ProdidProperty.factory('-//ONLINE DIRECTORY//NONSGML Version 1//EN');

            expect(prodid instanceof ProdidProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = '-//ONLINE DIRECTORY//NONSGML Version 1//EN';
            const config: ProdidPropertyRestConfig = [value, { value: 'text' }];
            const prodid = ProdidProperty.factory(config);

            expect(prodid instanceof ProdidProperty).to.equal(true);
        });
    });
});
