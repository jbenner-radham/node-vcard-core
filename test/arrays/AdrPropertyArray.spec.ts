import { expect } from 'chai';
import AdrProperty from '../../lib/properties/AdrProperty';
import AdrPropertyArray from '../../lib/properties/arrays/AdrPropertyArray';

describe('AdrPropertyArray', () => {
    it('is a function class', () => {
        expect(AdrPropertyArray).to.be.a('function');
    });

    describe('#push()', () => {
        it('is a method', () => {
            expect(AdrPropertyArray.prototype.push).to.be.a('function');
        });

        it('returns a number', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.';
            const adrProperties = new AdrPropertyArray();

            expect(adrProperties.push(value)).to.be.a('number');
        });

        it('returns the length of the array', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.';
            const adrProperties = new AdrPropertyArray();

            expect(adrProperties.push(value)).to.equal(1);
        });

        it('creates an `AdrProperty` object in the array', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.';
            const adrProperties = new AdrPropertyArray();

            adrProperties.push(value);

            expect(adrProperties.at(0) instanceof AdrProperty).to.equal(true);
        });

        it('creates an `AdrProperty` object in the array with the proper value', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.';
            const adrProperties = new AdrPropertyArray();

            adrProperties.push(value);

            expect(adrProperties.at(0).valueOf()).to.equal(value);
        });
    });
});
