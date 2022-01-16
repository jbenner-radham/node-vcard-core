import { expect } from 'chai';
import GenderProperty from '../../lib/properties/GenderProperty';

describe('GenderProperty', () => {
    it('is a function class', () => {
        expect(GenderProperty).to.be.a('function');
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
            const gender = new GenderProperty(`;it's complicated`);

            expect(gender.toString()).to.equal(`GENDER:;it's complicated`);
        });

        it('returns the proper string format when passed a sex and gender component', () => {
            const gender = new GenderProperty('O;intersex');

            expect(gender.toString()).to.equal('GENDER:O;intersex');
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'O;intersex';
            const config = { parameters, value };
            const gender = new GenderProperty(config);

            expect(gender.toString()).to.equal('GENDER;VALUE=text:O;intersex');
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
});
