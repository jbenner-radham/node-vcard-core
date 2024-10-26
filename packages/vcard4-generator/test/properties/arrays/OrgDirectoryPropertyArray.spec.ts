import { describe, it } from 'vitest';
import { expect } from 'chai';
import OrgDirectoryProperty from '../../../lib/properties/OrgDirectoryProperty';
import OrgDirectoryPropertyArray from '../../../lib/properties/arrays/OrgDirectoryPropertyArray';

describe('OrgDirectoryPropertyArray', () => {
    it('is a class', () => {
        expect(OrgDirectoryPropertyArray).to.be.a('class');
    });

    describe('#push()', () => {
        it('is a method', () => {
            expect(OrgDirectoryPropertyArray.prototype.push).to.be.a('function');
        });

        it('returns a number', () => {
            const value = '...';
            const orgDirectoryProperties = new OrgDirectoryPropertyArray();

            expect(orgDirectoryProperties.push(value)).to.be.a('number');
        });

        it('returns the length of the array', () => {
            const value = 'http://directory.mycompany.example.com';
            const orgDirectoryProperties = new OrgDirectoryPropertyArray();

            expect(orgDirectoryProperties.push(value)).to.equal(1);
        });

        it('creates an `OrgDirectoryProperty` object in the array', () => {
            const value = 'http://directory.mycompany.example.com';
            const orgDirectoryProperties = new OrgDirectoryPropertyArray();

            orgDirectoryProperties.push(value);

            expect(orgDirectoryProperties.at(0) instanceof OrgDirectoryProperty).to.equal(true);
        });

        it('creates an `OrgDirectoryProperty` object in the array with the proper value', () => {
            const value = 'http://directory.mycompany.example.com';
            const orgDirectoryProperties = new OrgDirectoryPropertyArray();

            orgDirectoryProperties.push(value);

            expect(orgDirectoryProperties.at(0).valueOf()).to.equal(value);
        });
    });
});
