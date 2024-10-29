import { describe, it } from 'vitest';
import { expect } from 'chai';
import GenderProperty, { type GenderRestConfig } from '../../lib/properties/GenderProperty.js';

describe('GenderProperty', () => {
    it('is a class', () => {
        expect(GenderProperty).to.be.a('class');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(GenderProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const gender = new GenderProperty('');

            expect(gender.toString()).to.be.a('string');
        });

        it('returns the proper string format when passed a sex component', () => {
            const gender = new GenderProperty('U');

            expect(gender.toString()).to.equal('GENDER:U');
        });

        it('returns the proper string format when passed a gender component', () => {
            const gender = new GenderProperty(';Agender');

            expect(gender.toString()).to.equal('GENDER:;Agender');
        });

        it('returns the proper string format when passed a sex and gender component', () => {
            const gender = new GenderProperty('O;Intersex');

            expect(gender.toString()).to.equal('GENDER:O;Intersex');
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'O;Intersex';
            const options = { group: 1 };
            const gender = new GenderProperty(value, parameters, options);

            expect(gender.toString()).to.equal(`1.GENDER:${value}`);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'O;Intersex';
            const gender = new GenderProperty(value, parameters);

            expect(gender.toString()).to.equal('GENDER;VALUE=text:O;Intersex');
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(GenderProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const gender = new GenderProperty('');

            expect(gender.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'M';
            const gender = new GenderProperty(value);

            expect(gender.valueOf()).to.equal(value);
        });
    });

    describe('.from()', () => {
        it('is a static method', () => {
            expect(GenderProperty.from).to.be.a('function');
        });

        it('returns an instance of `GenderProperty`', () => {
            const gender = GenderProperty.from('M;Transgender Man');

            expect(gender instanceof GenderProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const gender = new GenderProperty('M;Transgender Man');

            expect(GenderProperty.from(gender) instanceof GenderProperty).to.equal(true);
        });

        it('creates an instance from a string value argument', () => {
            const gender = GenderProperty.from('M;Transgender Man');

            expect(gender instanceof GenderProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'M;Transgender Man';
            const config: GenderRestConfig = [value, { value: 'text' }];
            const gender = GenderProperty.from(config);

            expect(gender instanceof GenderProperty).to.equal(true);
        });
    });
});
