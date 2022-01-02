import { expect } from 'chai';
import SourceProperty from '../../lib/properties/SourceProperty';

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
            const source = new SourceProperty(value);

            expect(source.toString()).to.equal(`SOURCE:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { pref: 1 };
            const value = 'ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US';
            const config = { parameters, value };
            const source = new SourceProperty(config);
            const actual = source.toString();
            const expected = 'SOURCE;PREF=1:ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US';

            expect(actual).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(SourceProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const source = new SourceProperty('ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US');

            expect(source.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US';
            const source = new SourceProperty(value);

            expect(source.valueOf()).to.equal(value);
        });
    });
});
