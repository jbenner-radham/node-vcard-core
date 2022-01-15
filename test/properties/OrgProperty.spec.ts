import { expect } from 'chai';
import OrgProperty from '../../lib/properties/OrgProperty';

describe('OrgProperty', () => {
    it('is a function class', () => {
        expect(OrgProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(OrgProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const org = new OrgProperty('ABC, Inc.;North American Division;Marketing');

            expect(org.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const escapedValue = 'ABC\\, Inc.;North American Division;Marketing';
            const org = new OrgProperty('ABC, Inc.;North American Division;Marketing');

            expect(org.toString()).to.equal(`ORG:${escapedValue}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { sortAs: 'ABC', type: 'work' as const };
            const value = 'ABC, Inc.;North American Division;Marketing';
            const escapedValue = 'ABC\\, Inc.;North American Division;Marketing';
            const config = { parameters, value };
            const org = new OrgProperty(config);
            const actual = org.toString();
            const expected = `ORG;SORT-AS=ABC;TYPE=work:${escapedValue}`;

            expect(actual).to.equal(expected);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'ABC, Inc.;North American Division;Marketing';
            const escapedValue = 'ABC\\, Inc.;North American Division;Marketing';
            const config = { parameters, value };
            const org = new OrgProperty(config);

            expect(org.toString()).to.equal(`ORG;VALUE=text:${escapedValue}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(OrgProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const org = new OrgProperty('ABC, Inc.;North American Division;Marketing');

            expect(org.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'ABC, Inc.;North American Division;Marketing';
            const org = new OrgProperty(value);

            expect(org.valueOf()).to.equal(value);
        });
    });
});
