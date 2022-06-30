import { EOL, FOLD_CONTINUATION_CHAR } from '@vcard/vcard4-meta';
import { expect } from 'chai';
import SourceProperty, { SourcePropertyRestConfig } from '../../lib/properties/SourceProperty';

describe('SourceProperty', () => {
    it('is a function class', () => {
        expect(SourceProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(SourceProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const source = new SourceProperty('ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US');

            expect(source.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US';
            const escapedValue = 'ldap://ldap.example.com/cn=Babs%20Jensen\\,%20o=Babsco\\,%20c=US';
            const source = new SourceProperty(value);

            expect(source.toString()).to.equal(`SOURCE:${escapedValue}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { pref: 1 };
            const value = 'ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US';
            const source = new SourceProperty(value, parameters);
            const actual = source.toString();
            const expected = [
                'SOURCE;PREF=1:ldap://ldap.example.com/cn=Babs%20Jensen\\,%20o=Babsco\\,%20c=U',
                'S'
            ].join(`${EOL}${FOLD_CONTINUATION_CHAR}`);

            expect(actual).to.equal(expected);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US';
            const source = new SourceProperty(value, parameters);
            const expected = [
                'SOURCE;VALUE=uri:ldap://ldap.example.com/cn=Babs%20Jensen\\,%20o=Babsco\\,%20',
                'c=US'
            ].join(`${EOL}${FOLD_CONTINUATION_CHAR}`);

            expect(source.toString()).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(SourceProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const value = 'ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US';
            const source = new SourceProperty(value);

            expect(source.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US';
            const source = new SourceProperty(value);

            expect(source.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(SourceProperty.factory).to.be.a('function');
        });

        it('returns an instance of `SourceProperty`', () => {
            const value = 'ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US';
            const source = SourceProperty.factory(value);

            expect(source instanceof SourceProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const value = 'ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US';
            const source = new SourceProperty(value);

            expect(SourceProperty.factory(source)).to.equal(source);
        });

        it('creates an instance from a string value argument', () => {
            const value = 'ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US';
            const source = SourceProperty.factory(value);

            expect(source instanceof SourceProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US';
            const config: SourcePropertyRestConfig = [value, { value: 'uri' }];
            const source = SourceProperty.factory(config);

            expect(source instanceof SourceProperty).to.equal(true);
        });
    });
});
