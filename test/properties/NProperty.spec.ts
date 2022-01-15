import { expect } from 'chai';
import NProperty from '../../lib/properties/NProperty';

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
            const config = { parameters, value };
            const n = new NProperty(config);
            const actual = n.toString();
            const expected = 'N;SORT-AS=John:Public;John;Quinlan;Mr.;Esq.';

            expect(actual).to.equal(expected);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'Public;John;Quinlan;Mr.;Esq.';
            const config = { parameters, value };
            const n = new NProperty(config);

            expect(n.toString()).to.equal(`N;VALUE=text:${value}`);
        });
    });
});
