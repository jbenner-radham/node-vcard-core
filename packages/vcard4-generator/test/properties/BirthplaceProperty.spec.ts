import { describe, it } from 'vitest';
import { expect } from 'chai';
import BirthplaceProperty, { type BirthplaceRestConfig } from '../../lib/properties/BirthplaceProperty.js';

describe('BirthplaceProperty', () => {
    it('is a class', () => {
        expect(BirthplaceProperty).to.be.a('class');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(BirthplaceProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const birthplace = new BirthplaceProperty('...');

            expect(birthplace.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = `Babies'R'Us Hospital`;
            const birthplace = new BirthplaceProperty(value);

            expect(birthplace.toString()).to.equal(`BIRTHPLACE:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { value: 'uri' as const };
            const value = 'http://example.com/hospitals/babiesrus.vcf';
            const birthplace = new BirthplaceProperty(value, parameters);
            const actual = birthplace.toString();
            const expected = `BIRTHPLACE;VALUE=uri:${value}`;

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'http://example.com/hospitals/babiesrus.vcf';
            const options = { group: 1 };
            const birthplace = new BirthplaceProperty(value, parameters, options);

            expect(birthplace.toString()).to.equal(`1.BIRTHPLACE:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(BirthplaceProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const birthplace = new BirthplaceProperty(`Babies'R'Us Hospital`);

            expect(birthplace.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = `Babies'R'Us Hospital`;
            const birthplace = new BirthplaceProperty(value);

            expect(birthplace.valueOf()).to.equal(value);
        });
    });

    describe('.from()', () => {
        it('is a static method', () => {
            expect(BirthplaceProperty.from).to.be.a('function');
        });

        it('returns an instance of `BirthplaceProperty`', () => {
            const birthplace = BirthplaceProperty.from(`Babies'R'Us Hospital`);

            expect(birthplace instanceof BirthplaceProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const birthplace = new BirthplaceProperty(`Babies'R'Us Hospital`);

            expect(BirthplaceProperty.from(birthplace)).to.equal(birthplace);
        });

        it('creates an instance from a string value argument', () => {
            const birthplace = BirthplaceProperty.from(`Babies'R'Us Hospital`);

            expect(birthplace instanceof BirthplaceProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'geo:46.769307,-71.283079';
            const config: BirthplaceRestConfig = [value, { value: 'uri' }];
            const birthplace = BirthplaceProperty.from(config);

            expect(birthplace instanceof BirthplaceProperty).to.equal(true);
        });
    });
});
