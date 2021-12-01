import { expect } from 'chai';
import N from '../../lib/properties/N';

describe('N', () => {
    it('is a function class', () => {
        expect(N).to.be.a('function');
    });

    describe('#familyName', () => {
        it('is a string property', () => {
            const n = new N('Benner;Bella;;;');

            expect(n.familyName).to.be.a('string');
        });

        it('returns the family name component', () => {
            const n = new N('Benner;Bella;;;');

            expect(n.familyName).to.equal('Benner');
        });
    });

    describe('#givenName', () => {
        it('is a string property', () => {
            const n = new N('Benner;Daisy;;;');

            expect(n.givenName).to.be.a('string');
        });

        it('returns the given name component', () => {
            const n = new N('Benner;Daisy;;;');

            expect(n.givenName).to.equal('Daisy');
        });
    });

    describe('#additionalName', () => {
        it('is a string property', () => {
            const n = new N('Public;John;Quinlan;Mr.;Esq.');

            expect(n.additionalName).to.be.a('string');
        });

        it('returns the additional name component', () => {
            const n = new N('Public;John;Quinlan;Mr.;Esq.');

            expect(n.additionalName).to.equal('Quinlan');
        });
    });

    describe('#honorificPrefix', () => {
        it('is a string property', () => {
            const n = new N('Public;John;Quinlan;Mr.;Esq.');

            expect(n.honorificPrefix).to.be.a('string');
        });

        it('returns the additional name component', () => {
            const n = new N('Public;John;Quinlan;Mr.;Esq.');

            expect(n.honorificPrefix).to.equal('Mr.');
        });
    });

    describe('#honorificSuffix', () => {
        it('is a string property', () => {
            const n = new N('Public;John;Quinlan;Mr.;Esq.');

            expect(n.honorificSuffix).to.be.a('string');
        });

        it('returns the additional name component', () => {
            const n = new N('Public;John;Quinlan;Mr.;Esq.');

            expect(n.honorificSuffix).to.equal('Esq.');
        });
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(N.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const n = new N('Doe;Jane;;;');

            expect(n.toString()).to.be.a('string');
        });
    });
});
