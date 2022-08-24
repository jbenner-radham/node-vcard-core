import { expect } from 'chai';
import ContactUriProperty, { ContactUriPropertyRestConfig } from '../../lib/properties/ContactUriProperty';

describe('ContactUriProperty', () => {
    it('is a function class', () => {
        expect(ContactUriProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(ContactUriProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const contactUri = new ContactUriProperty('https://contact.example.com');

            expect(contactUri.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'https://contact.example.com';
            const contactUri = new ContactUriProperty(value);

            expect(contactUri.toString()).to.equal(`CONTACT-URI:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { pref: 1 };
            const value = 'mailto:contact@example.com';
            const contactUri = new ContactUriProperty(value, parameters);
            const actual = contactUri.toString();
            const expected = `CONTACT-URI;PREF=1:${value}`;

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'mailto:contact@example.com';
            const options = { group: 'office' };
            const contactUri = new ContactUriProperty(value, parameters, options);

            expect(contactUri.toString()).to.equal(`OFFICE.CONTACT-URI:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(ContactUriProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const contactUri = new ContactUriProperty('https://contact.example.com');

            expect(contactUri.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'https://contact.example.com';
            const contactUri = new ContactUriProperty(value);

            expect(contactUri.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(ContactUriProperty.factory).to.be.a('function');
        });

        it('returns an instance of `ContactUriProperty`', () => {
            const contactUri = ContactUriProperty.factory('https://contact.example.com');

            expect(contactUri instanceof ContactUriProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const contactUri = new ContactUriProperty('https://contact.example.com');

            expect(ContactUriProperty.factory(contactUri)).to.equal(contactUri);
        });

        it('creates an instance from a string value argument', () => {
            const contactUri = ContactUriProperty.factory('https://contact.example.com');

            expect(contactUri instanceof ContactUriProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'mailto:contact@example.com';
            const config: ContactUriPropertyRestConfig = [value, { pref: 1 }];
            const contactUri = ContactUriProperty.factory(config);

            expect(contactUri instanceof ContactUriProperty).to.equal(true);
        });
    });
});
