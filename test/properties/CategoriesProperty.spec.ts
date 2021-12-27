import { expect } from 'chai';
import CategoriesProperty from '../../lib/properties/CategoriesProperty';

describe('CategoriesProperty', () => {
    it('is a function class', () => {
        expect(CategoriesProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(CategoriesProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const categories = new CategoriesProperty('TRAVEL AGENT');

            expect(categories.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'TRAVEL AGENT';
            const categories = new CategoriesProperty(value);

            expect(categories.toString()).to.equal(`CATEGORIES:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(CategoriesProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const categories = new CategoriesProperty('INTERNET,IETF,INDUSTRY,INFORMATION TECHNOLOGY');

            expect(categories.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'INTERNET,IETF,INDUSTRY,INFORMATION TECHNOLOGY';
            const categories = new CategoriesProperty(value);

            expect(categories.valueOf()).to.equal(value);
        });
    });
});
