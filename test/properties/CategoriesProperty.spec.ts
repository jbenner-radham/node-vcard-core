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

        it('correctly returns parameters', () => {
            const parameters = { type: 'work' as const };
            const value = 'TRAVEL AGENT';
            const config = { parameters, value };
            const categories = new CategoriesProperty(config);
            const actual = categories.toString();
            const expected = 'CATEGORIES;TYPE=work:TRAVEL AGENT';

            expect(actual).to.equal(expected);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'http://cal.example.com/calA';
            const config = { parameters, value };
            const categories = new CategoriesProperty(config);

            expect(categories.toString()).to.equal(`CATEGORIES;VALUE=text:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(CategoriesProperty.prototype.valueOf).to.be.a('function');
        });

        /** @todo Un-skip these two tests after implementing array argument support! */
        it.skip('returns a string', () => {
            const categories = new CategoriesProperty('INTERNET,IETF,INDUSTRY,INFORMATION TECHNOLOGY');

            expect(categories.valueOf()).to.be.a('string');
        });

        it.skip('returns the same value passed to it', () => {
            const value = 'INTERNET,IETF,INDUSTRY,INFORMATION TECHNOLOGY';
            const categories = new CategoriesProperty(value);

            expect(categories.valueOf()).to.equal(value);
        });
    });
});
