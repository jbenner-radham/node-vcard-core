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

        /** @todo Un-skip this once property value escaping is implemented! */
        it.skip('returns the proper string format', () => {
            // eslint-disable-next-line no-useless-escape
            const escapedvalue = 'ABC\, Inc.;North American Division;Marketing';
            const org = new OrgProperty('ABC, Inc.;North American Division;Marketing');

            expect(org.toString()).to.equal(`ORG:${escapedvalue}`);
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
