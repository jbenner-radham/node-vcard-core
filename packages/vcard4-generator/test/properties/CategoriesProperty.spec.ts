import { expect } from 'chai';
import CategoriesProperty, { CategoriesPropertyRestConfig } from '../../lib/properties/CategoriesProperty';

describe('CategoriesProperty', () => {
    it('is a class', () => {
        expect(CategoriesProperty).to.be.a('class');
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
            const categories = new CategoriesProperty(value, parameters);
            const actual = categories.toString();
            const expected = 'CATEGORIES;TYPE=work:TRAVEL AGENT';

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'TRAVEL AGENT';
            const options = { group: 1 };
            const categories = new CategoriesProperty(value, parameters, options);

            expect(categories.toString()).to.equal(`1.CATEGORIES:${value}`);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'TRAVEL AGENT';
            const categories = new CategoriesProperty(value, parameters);

            expect(categories.toString()).to.equal(`CATEGORIES;VALUE=text:${value}`);
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

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(CategoriesProperty.factory).to.be.a('function');
        });

        it('returns an instance of `CategoriesProperty`', () => {
            const categories = CategoriesProperty.factory('INTERNET,IETF,INDUSTRY,INFORMATION TECHNOLOGY');

            expect(categories instanceof CategoriesProperty).to.equal(true);
        });

        describe('when passed an instance', () => {
            it('returns that instance', () => {
                const categories = new CategoriesProperty('INTERNET,IETF,INDUSTRY,INFORMATION TECHNOLOGY');

                expect(categories).to.equal(CategoriesProperty.factory(categories));
            });

            it('outputs the correct value when `toString()` is called on the factory returned instance', () => {
                const value = 'INTERNET,IETF,INDUSTRY,INFORMATION TECHNOLOGY';
                const categories = CategoriesProperty.factory(value);
                const actual = categories.toString();
                const expected = 'CATEGORIES:INTERNET\\,IETF\\,INDUSTRY\\,INFORMATION TECHNOLOGY';

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a string', () => {
            it('creates an instance', () => {
                const categories = CategoriesProperty.factory('INTERNET,IETF,INDUSTRY,INFORMATION TECHNOLOGY');

                expect(categories instanceof CategoriesProperty).to.equal(true);
            });

            it('outputs the correct value when `toString()` is called on the factory created instance', () => {
                const value = 'INTERNET,IETF,INDUSTRY,INFORMATION TECHNOLOGY';
                const categories = CategoriesProperty.factory(value);
                const actual = categories.toString();
                const expected = 'CATEGORIES:INTERNET\\,IETF\\,INDUSTRY\\,INFORMATION TECHNOLOGY';

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed an array of strings', () => {
            it('creates an instance', () => {
                const value = ['INTERNET', 'IETF', 'INDUSTRY', 'INFORMATION TECHNOLOGY'];
                const categories = CategoriesProperty.factory(value);

                expect(categories instanceof CategoriesProperty).to.equal(true);
            });

            it('outputs the correct value when `toString()` is called on the factory created instance', () => {
                const value = ['INTERNET', 'IETF', 'INDUSTRY', 'INFORMATION TECHNOLOGY'];
                const categories = CategoriesProperty.factory(value);
                const actual = categories.toString();
                const expected = 'CATEGORIES:INTERNET\\,IETF\\,INDUSTRY\\,INFORMATION TECHNOLOGY';

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed an array', () => {
            it('creates an instance', () => {
                const value = 'INTERNET,IETF,INDUSTRY,INFORMATION TECHNOLOGY';
                const config: CategoriesPropertyRestConfig = [value, { pref: 1 }];
                const categories = CategoriesProperty.factory(config);

                expect(categories instanceof CategoriesProperty).to.equal(true);
            });

            it('outputs the correct value when `toString()` is called on the factory created instance', () => {
                const value = 'INTERNET,IETF,INDUSTRY,INFORMATION TECHNOLOGY';
                const config: CategoriesPropertyRestConfig = [value, { pref: 1 }];
                const categories = CategoriesProperty.factory(config);
                const actual = categories.toString();
                const expected = 'CATEGORIES;PREF=1:INTERNET\\,IETF\\,INDUSTRY\\,INFORMATION TECHNOLOGY';

                expect(actual).to.equal(expected);
            });
        });
    });
});
