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

    describe('#toString()', () => {
        it('is a method', () => {
            expect(AdrProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const adr = new AdrProperty(';;123 Main Street;Any Town;CA;91921-1234;U.S.A.');

            expect(adr.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.';
            const adr = new AdrProperty(value);

            expect(adr.toString()).to.equal(`ADR:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { geo: '"geo:12.3457,78.910"', type: 'home' as const };
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.';
            const config = { parameters, value };
            const adr = new AdrProperty(config);
            const actual = adr.toString();
            const expected = 'ADR;GEO="geo:12.3457,78.910";TYPE=home:;;123 Main Street;Any Town;CA;91921-1234;U.S.A.';

            expect(actual).to.equal(expected);
        });
    });
});
