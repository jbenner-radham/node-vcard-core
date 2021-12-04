import { expect } from 'chai';
import AdrProperty from '../../lib/properties/AdrProperty';

describe('AdrProperty', () => {
    it('is a function class', () => {
        expect(AdrProperty).to.be.a('function');
    });

    describe('#postOfficeBox', () => {
        it('is a string property', () => {
            const value = 'PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.postOfficeBox).to.be.a('string');
        });

        it('returns the post office box component', () => {
            const value = 'PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.postOfficeBox).to.equal('PO Box 1337');
        });
    });

    describe('#extendedAddress', () => {
        it('is a string property', () => {
            const value = 'PO Box 1337;Extended;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.extendedAddress).to.be.a('string');
        });

        it('returns the extended address component', () => {
            const value = 'PO Box 1337;Extended;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.extendedAddress).to.equal('Extended');
        });
    });

    describe('#streetAddress', () => {
        it('is a string property', () => {
            const value = ';;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.streetAddress).to.be.a('string');
        });

        it('returns the street address component', () => {
            const value = ';;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.streetAddress).to.equal('1234 Acme Rd.');
        });
    });

    describe('#locality', () => {
        it('is a string property', () => {
            const value = ';;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.locality).to.be.a('string');
        });

        it('returns the locality component', () => {
            const value = ';;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.locality).to.equal('Sometown');
        });
    });

    describe('#region', () => {
        it('is a string property', () => {
            const value = ';;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.region).to.be.a('string');
        });

        it('returns the region component', () => {
            const value = ';;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.region).to.equal('OH');
        });
    });

    describe('#postalCode', () => {
        it('is a string property', () => {
            const value = ';;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.postalCode).to.be.a('string');
        });

        it('returns the postal code component', () => {
            const value = ';;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.postalCode).to.equal('43204');
        });
    });

    describe('#countryName', () => {
        it('is a string property', () => {
            const value = ';;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.countryName).to.be.a('string');
        });

        it('returns the country name component', () => {
            const value = ';;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.countryName).to.equal('United States of America');
        });
    });

    describe('#components()', () => {
        it('is a method', () => {
            expect(AdrProperty.prototype.components).to.be.a('function');
        });

        it('returns an array', () => {
            const value = ';;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.components()).to.be.an('array');
        });

        it('returns an array of strings', () => {
            const value = ';;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);
            const isString = (value: any): value is string => typeof value === 'string';

            expect(adr.components().every(isString)).to.equal(true);
        });

        it('returns the components of the property value', () => {
            const value = ';;1234 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);
            const components = value.split(';');

            expect(adr.components()).to.deep.equal(components);
        });
    });
});
