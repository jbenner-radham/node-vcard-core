import { expect } from 'chai';
import NProperty, { NPropertyRestParameter } from '../../lib/properties/NProperty';

describe('NProperty', () => {
    it('is a function class', () => {
        expect(NProperty).to.be.a('function');
    });

    describe('#familyName', () => {
        it('is a string property', () => {
            const n = new NProperty('Benner;Bella;;;');

            expect(n.familyName).to.be.a('string');
        });

        it('returns the family name component', () => {
            const n = new NProperty('Benner;Bella;;;');

            expect(n.familyName).to.equal('Benner');
        });
    });

    describe('#givenName', () => {
        it('is a string property', () => {
            const n = new NProperty('Benner;Daisy;;;');

            expect(n.givenName).to.be.a('string');
        });

        it('returns the given name component', () => {
            const n = new NProperty('Benner;Daisy;;;');

            expect(n.givenName).to.equal('Daisy');
        });
    });

    describe('#additionalName', () => {
        it('is a string property', () => {
            const n = new NProperty('Public;John;Quinlan;Mr.;Esq.');

            expect(n.additionalName).to.be.a('string');
        });

        it('returns the additional name component', () => {
            const n = new NProperty('Public;John;Quinlan;Mr.;Esq.');

            expect(n.additionalName).to.equal('Quinlan');
        });
    });

    describe('#honorificPrefix', () => {
        it('is a string property', () => {
            const n = new NProperty('Public;John;Quinlan;Mr.;Esq.');

            expect(n.honorificPrefix).to.be.a('string');
        });

        it('returns the additional name component', () => {
            const n = new NProperty('Public;John;Quinlan;Mr.;Esq.');

            expect(n.honorificPrefix).to.equal('Mr.');
        });
    });

    describe('#honorificSuffix', () => {
        it('is a string property', () => {
            const n = new NProperty('Public;John;Quinlan;Mr.;Esq.');

            expect(n.honorificSuffix).to.be.a('string');
        });

        it('returns the additional name component', () => {
            const n = new NProperty('Public;John;Quinlan;Mr.;Esq.');

            expect(n.honorificSuffix).to.equal('Esq.');
        });
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(NProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const n = new NProperty('Doe;Jane;;;');

            expect(n.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'Public;John;Quinlan;Mr.;Esq.';
            const n = new NProperty(value);

            expect(n.toString()).to.equal(`N:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { sortAs: 'John' };
            const value = 'Public;John;Quinlan;Mr.;Esq.';
            const n = new NProperty(value, parameters);
            const actual = n.toString();
            const expected = 'N;SORT-AS=John:Public;John;Quinlan;Mr.;Esq.';

            expect(actual).to.equal(expected);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'Public;John;Quinlan;Mr.;Esq.';
            const n = new NProperty(value, parameters);

            expect(n.toString()).to.equal(`N;VALUE=text:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(NProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const n = new NProperty('Public;John;Quinlan;Mr.;Esq.');

            expect(n.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'Public;John;Quinlan;Mr.;Esq.';
            const n = new NProperty(value);

            expect(n.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(NProperty.factory).to.be.a('function');
        });

        it('returns an instance of `NProperty`', () => {
            const n = NProperty.factory('Public;John;Quinlan;Mr.;Esq.');

            expect(n instanceof NProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const n = new NProperty('Public;John;Quinlan;Mr.;Esq.');

            expect(NProperty.factory(n)).to.equal(n);
        });

        it('creates an instance from a string value argument', () => {
            const n = NProperty.factory('Public;John;Quinlan;Mr.;Esq.');

            expect(n instanceof NProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'Public;John;Quinlan;Mr.;Esq.';
            const config: NPropertyRestParameter = [value, { value: 'text' }];
            const n = NProperty.factory(config);

            expect(n instanceof NProperty).to.equal(true);
        });
    });
});
