import { expect } from 'chai';
import OrgDirectoryProperty, { OrgDirectoryPropertyRestParameter }  from '../../lib/properties/OrgDirectoryProperty';

describe('OrgDirectoryProperty', () => {
    it('is a function class', () => {
        expect(OrgDirectoryProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(OrgDirectoryProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const orgDirectory = new OrgDirectoryProperty('http://directory.mycompany.example.com');

            expect(orgDirectory.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'http://directory.mycompany.example.com';
            const orgDirectory = new OrgDirectoryProperty(value);

            expect(orgDirectory.toString()).to.equal(`ORG-DIRECTORY:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { index: 1 };
            const value = 'http://directory.mycompany.example.com';
            const orgDirectory = new OrgDirectoryProperty(value, parameters);
            const actual = orgDirectory.toString();
            const expected = `ORG-DIRECTORY;INDEX=1:${value}`;

            expect(actual).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(OrgDirectoryProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const orgDirectory = new OrgDirectoryProperty('http://directory.mycompany.example.com');

            expect(orgDirectory.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'http://directory.mycompany.example.com';
            const orgDirectory = new OrgDirectoryProperty(value);

            expect(orgDirectory.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(OrgDirectoryProperty.factory).to.be.a('function');
        });

        it('returns an instance of `OrgDirectoryProperty`', () => {
            const value = 'ldap://ldap.tech.example/o=Example%20Tech,ou=Engineering';
            const orgDirectory = OrgDirectoryProperty.factory(value);

            expect(orgDirectory instanceof OrgDirectoryProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const value = 'ldap://ldap.tech.example/o=Example%20Tech,ou=Engineering';
            const orgDirectory = new OrgDirectoryProperty(value);

            expect(OrgDirectoryProperty.factory(orgDirectory)).to.equal(orgDirectory);
        });

        it('creates an instance from a string value argument', () => {
            const value = 'ldap://ldap.tech.example/o=Example%20Tech,ou=Engineering';
            const orgDirectory = OrgDirectoryProperty.factory(value);

            expect(orgDirectory instanceof OrgDirectoryProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'ldap://ldap.tech.example/o=Example%20Tech,ou=Engineering';
            const config: OrgDirectoryPropertyRestParameter = [value, { pref: 1 }];
            const orgDirectory = OrgDirectoryProperty.factory(config);

            expect(orgDirectory instanceof OrgDirectoryProperty).to.equal(true);
        });
    });
});
