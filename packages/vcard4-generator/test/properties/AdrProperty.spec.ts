import { describe, it } from 'vitest';
import { EOL, FOLD_CONTINUATION_CHAR } from '@vcard/vcard4-meta';
import { expect } from 'chai';
import AdrProperty, { type AdrRestConfig } from '../../lib/properties/AdrProperty.js';

describe('AdrProperty', () => {
    it('is a class', () => {
        expect(AdrProperty).to.be.a('class');
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

    describe('#room', () => {
        it('is a string property', () => {
            const value = ';;123 Main Street Room 1352;Any Town;CA;91921-1234;U.S.A.;Room 1352;;;123;Main Street;;;;;;';
            const adr = new AdrProperty(value);

            expect(adr.room).to.be.a('string');
        });

        it('returns the room component', () => {
            const value = ';;123 Main Street Room 1352;Any Town;CA;91921-1234;U.S.A.;Room 1352;;;123;Main Street;;;;;;';
            const adr = new AdrProperty(value);

            expect(adr.room).to.equal('Room 1352');
        });
    });

    describe('#apartment', () => {
        it('is a string property', () => {
            const value = ';;123 Main Street Apartment 101;Any Town;CA;91921-1234;U.S.A.' +
                ';;Apartment 101;;123;Main Street;;;;;;';
            const adr = new AdrProperty(value);

            expect(adr.apartment).to.be.a('string');
        });

        it('returns the apartment component', () => {
            const value = ';;123 Main Street Apartment 101;Any Town;CA;91921-1234;U.S.A.' +
                ';;Apartment 101;;123;Main Street;;;;;;';
            const adr = new AdrProperty(value);

            expect(adr.apartment).to.equal('Apartment 101');
        });
    });

    describe('#floor', () => {
        it('is a string property', () => {
            const value = ';;123 Main Street Floor 2;Any Town;CA;91921-1234;U.S.A.' +
                ';;;Floor 2;123;Main Street;;;;;;';
            const adr = new AdrProperty(value);

            expect(adr.floor).to.be.a('string');
        });

        it('returns the floor component', () => {
            const value = ';;123 Main Street Floor 2;Any Town;CA;91921-1234;U.S.A.' +
                ';;;Floor 2;123;Main Street;;;;;;';
            const adr = new AdrProperty(value);

            expect(adr.floor).to.equal('Floor 2');
        });
    });

    describe('#streetNumber', () => {
        it('is a string property', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.;;;;123;Main Street;;;;;;';
            const adr = new AdrProperty(value);

            expect(adr.streetNumber).to.be.a('string');
        });

        it('returns the streetNumber component', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.;;;;123;Main Street;;;;;;';
            const adr = new AdrProperty(value);

            expect(adr.streetNumber).to.equal('123');
        });
    });

    describe('#streetName', () => {
        it('is a string property', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.;;;;123;Main Street;;;;;;';
            const adr = new AdrProperty(value);

            expect(adr.streetName).to.be.a('string');
        });

        it('returns the streetName component', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.;;;;123;Main Street;;;;;;';
            const adr = new AdrProperty(value);

            expect(adr.streetName).to.equal('Main Street');
        });
    });

    describe('#building', () => {
        it('is a string property', () => {
            const value = ';;123 Main Street Building 14;Any Town;CA;91921-1234;U.S.A.' +
                ';;;;123;Main Street;Building 14;;;;;';
            const adr = new AdrProperty(value);

            expect(adr.building).to.be.a('string');
        });

        it('returns the building component', () => {
            const value = ';;123 Main Street Building 14;Any Town;CA;91921-1234;U.S.A.' +
                ';;;;123;Main Street;Building 14;;;;;';
            const adr = new AdrProperty(value);

            expect(adr.building).to.equal('Building 14');
        });
    });

    /** @see {@link https://en.wikipedia.org/wiki/Japanese_addressing_system} */
    describe('#block', () => {
        it('is a string property', () => {
            const value = ';;7-2, Marunouchi 2-Chome;Chiyoda-ku;Tokyo;100-8994;Japan' +
                ';;;;;;2;7;;Marunouchi 2-Chome;;';
            const adr = new AdrProperty(value);

            expect(adr.block).to.be.a('string');
        });

        it('returns the block component', () => {
            const value = ';;7-2, Marunouchi 2-Chome;Chiyoda-ku;Tokyo;100-8994;Japan' +
                ';;;;;;2;7;;Marunouchi 2-Chome;;';
            const adr = new AdrProperty(value);

            expect(adr.block).to.equal('7');
        });
    });

    /** @see {@link https://www.upu.int/UPU/media/upu/PostalEntitiesFiles/addressingUnit/thaEn.pdf} */
    describe('#subdistrict', () => {
        it('is a string property', () => {
            const value = ';;491 Rangsit-Nakhon Nayok 4 Road;;Pathumthani;12130;Thailand' +
               ';;;;491;Rangsit-Nakhon Nayok 4 Road;;;Prachathipat;Amphoe Tanyaburi;;';
            const adr = new AdrProperty(value);

            expect(adr.subdistrict).to.be.a('string');
        });

        it('returns the subdistrict component', () => {
            const value = ';;491 Rangsit-Nakhon Nayok 4 Road;;Pathumthani;12130;Thailand' +
                ';;;;491;Rangsit-Nakhon Nayok 4 Road;;;Prachathipat;Amphoe Tanyaburi;;';
            const adr = new AdrProperty(value);

            expect(adr.subdistrict).to.be.equal('Prachathipat');
        });
    });

    /** @see {@link https://www.upu.int/UPU/media/upu/PostalEntitiesFiles/addressingUnit/thaEn.pdf} */
    describe('#district', () => {
        it('is a string property', () => {
            const value = ';;491 Rangsit-Nakhon Nayok 4 Road;;Pathumthani;12130;Thailand' +
                ';;;;491;Rangsit-Nakhon Nayok 4 Road;;;Prachathipat;Amphoe Tanyaburi;;';
            const adr = new AdrProperty(value);

            expect(adr.district).to.be.a('string');
        });

        it('returns the subdistrict component', () => {
            const value = ';;491 Rangsit-Nakhon Nayok 4 Road;;Pathumthani;12130;Thailand' +
                ';;;;491;Rangsit-Nakhon Nayok 4 Road;;;Prachathipat;Amphoe Tanyaburi;;';
            const adr = new AdrProperty(value);

            expect(adr.district).to.be.equal('Amphoe Tanyaburi');
        });
    });

    describe('#landmark', () => {
        it('is a string', () => {
            const value = ';;1600 Pennsylvania Avenue NW;Washington;DC;20500-0005;U.S.A.' +
                ';;;;1600;Pennsylvania Avenue NW;;;;;White House;';
            const adr = new AdrProperty(value);

            expect(adr.landmark).to.be.a('string');
        });

        it('returns the landmark component', () => {
            const value = ';;1600 Pennsylvania Avenue NW;Washington;DC;20500-0005;U.S.A.' +
                ';;;;1600;Pennsylvania Avenue NW;;;;;White House;';
            const adr = new AdrProperty(value);

            expect(adr.landmark).to.equal('White House');
        });
    });

    describe('#direction', () => {
        it('is a string property', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.' +
                ';;;;123;Main Street;;;;;;North';
            const adr = new AdrProperty(value);

            expect(adr.direction).to.be.a('string');
        });

        it('returns the direction component', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.' +
                ';;;;123;Main Street;;;;;;North';
            const adr = new AdrProperty(value);

            expect(adr.direction).to.equal('North');
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

        it('correctly returns the derived parameter', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.';
            const parameters = { derived: true };
            const adr = new AdrProperty(value, parameters);

            expect(adr.toString()).to.equal(`ADR;DERIVED=true:${value}`);
        });

        it('correctly returns geo and type parameters', () => {
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

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.';
            const options = { group: 'office' };
            const adr = new AdrProperty(value, parameters, options);

            expect(adr.toString()).to.equal(`OFFICE.ADR:${value}`);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.';
            const adr = new AdrProperty(value, parameters);

            expect(adr.toString()).to.equal(`ADR;VALUE=text:${value}`);
        });
    });

    describe('.from()', () => {
        it('is a static method', () => {
            expect(AdrProperty.from).to.be.a('function');
        });

        it('returns an instance of `AdrProperty`', () => {
            const adr = AdrProperty.from(';;123 Main Street;Any Town;CA;91921-1234;U.S.A.');

            expect(adr instanceof AdrProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const adr = new AdrProperty(';;123 Main Street;Any Town;CA;91921-1234;U.S.A.');

            expect(AdrProperty.from(adr)).to.equal(adr);
        });

        it('creates an instance from a string value argument', () => {
            const adr = AdrProperty.from(';;123 Main Street;Any Town;CA;91921-1234;U.S.A.');

            expect(adr instanceof AdrProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.';
            const config: AdrRestConfig = [value, { type: 'home' }];
            const adr = AdrProperty.from(config);

            expect(adr instanceof AdrProperty).to.equal(true);
        });
    });

    it('sets a backwards compatible value when street number and name are set', () => {
        const value = ';;;Any Town;CA;91921-1234;U.S.A.;;;;123;Main Street;;;;;;';
        const adr = new AdrProperty(value);

        expect(adr.valueOf()).to.equal(';;123 Main Street;Any Town;CA;91921-1234;U.S.A.;;;;123;Main Street;;;;;;');
    });
});
