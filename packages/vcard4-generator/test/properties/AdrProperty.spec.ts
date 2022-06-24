import { EOL, FOLD_CONTINUATION_CHAR } from '@vcard/vcard4-meta';
import { expect } from 'chai';
import AdrProperty, { AdrPropertyRestParameter } from '../../lib/properties/AdrProperty';

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

        it('returns a street address component with an escaped semicolon', () => {
            const value = ';;1234\\;5678 Acme Rd.;Sometown;OH;43204;United States of America';
            const adr = new AdrProperty(value);

            expect(adr.streetAddress).to.equal('1234\\;5678 Acme Rd.');
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
            const parameters = { geo: 'geo:12.3457,78.910', type: 'home' as const };
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.';
            const adr = new AdrProperty(value, parameters);
            const actual = adr.toString();
            const expected = [
                'ADR;GEO="geo:12.3457,78.910";TYPE=home:;;123 Main Street;Any Town;CA;91921-',
                '1234;U.S.A.'
            ].join(`${EOL}${FOLD_CONTINUATION_CHAR}`);

            expect(actual).to.equal(expected);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.';
            const adr = new AdrProperty(value, parameters);

            expect(adr.toString()).to.equal(`ADR;VALUE=text:${value}`);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(AdrProperty.factory).to.be.a('function');
        });

        it('returns an instance of `AdrProperty`', () => {
            const adr = AdrProperty.factory(';;123 Main Street;Any Town;CA;91921-1234;U.S.A.');

            expect(adr instanceof AdrProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const adr = new AdrProperty(';;123 Main Street;Any Town;CA;91921-1234;U.S.A.');

            expect(AdrProperty.factory(adr)).to.equal(adr);
        });

        it('creates an instance from a string value argument', () => {
            const adr = AdrProperty.factory(';;123 Main Street;Any Town;CA;91921-1234;U.S.A.');

            expect(adr instanceof AdrProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.';
            const config: AdrPropertyRestParameter = [value, { type: 'home' }];
            const adr = AdrProperty.factory(config);

            expect(adr instanceof AdrProperty).to.equal(true);
        });
    });
});
