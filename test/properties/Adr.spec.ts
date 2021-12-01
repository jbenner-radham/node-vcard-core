import { expect } from 'chai';
import Adr from '../../lib/properties/Adr';

describe('Adr', () => {
    it('is a function class', () => {
        expect(Adr).to.be.a('function');
    });

    describe('#postOfficeBox', () => {
        it('is a string property', () => {
            const adr = new Adr('PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;US');

            expect(adr.postOfficeBox).to.be.a('string');
        });

        it('returns the post office box component', () => {
            const adr = new Adr('PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;United States of America');

            expect(adr.postOfficeBox).to.equal('PO Box 1337');
        });
    });

    describe('#extendedAddress', () => {
        it('is a string property', () => {
            const adr = new Adr('PO Box 1337;Extended;1234 Acme Rd.;Sometown;OH;43204;United States of America');

            expect(adr.extendedAddress).to.be.a('string');
        });

        it('returns the extended address component', () => {
            const adr = new Adr('PO Box 1337;Extended;1234 Acme Rd.;Sometown;OH;43204;United States of America');

            expect(adr.extendedAddress).to.equal('Extended');
        });
    });

    describe('#streetAddress', () => {
        it('is a string property', () => {
            const adr = new Adr('PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;United States of America');

            expect(adr.streetAddress).to.be.a('string');
        });

        it('returns the street address component', () => {
            const adr = new Adr('PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;United States of America');

            expect(adr.streetAddress).to.equal('1234 Acme Rd.');
        });
    });

    describe('#locality', () => {
        it('is a string property', () => {
            const adr = new Adr('PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;United States of America');

            expect(adr.locality).to.be.a('string');
        });

        it('returns the locality component', () => {
            const adr = new Adr('PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;United States of America');

            expect(adr.locality).to.equal('Sometown');
        });
    });

    describe('#region', () => {
        it('is a string property', () => {
            const adr = new Adr('PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;United States of America');

            expect(adr.region).to.be.a('string');
        });

        it('returns the region component', () => {
            const adr = new Adr('PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;United States of America');

            expect(adr.region).to.equal('OH');
        });
    });

    describe('#postalCode', () => {
        it('is a string property', () => {
            const adr = new Adr('PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;United States of America');

            expect(adr.postalCode).to.be.a('string');
        });

        it('returns the postal code component', () => {
            const adr = new Adr('PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;United States of America');

            expect(adr.postalCode).to.equal('43204');
        });
    });

    describe('#countryName', () => {
        it('is a string property', () => {
            const adr = new Adr('PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;United States of America');

            expect(adr.countryName).to.be.a('string');
        });

        it('returns the country name component', () => {
            const adr = new Adr('PO Box 1337;;1234 Acme Rd.;Sometown;OH;43204;United States of America');

            expect(adr.countryName).to.equal('United States of America');
        });
    });
});
