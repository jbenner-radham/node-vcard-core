import { describe, it } from 'vitest';
import { expect } from 'chai';
import isValidPrefParameter from '../../lib/util/is-valid-pref-parameter.js';

describe('isValidPrefParameter', () => {
    it('is a function', () => {
        expect(isValidPrefParameter).to.be.a('function');
    });

    it('returns a boolean', () => {
        expect(isValidPrefParameter(NaN)).to.be.a('boolean');
    });

    it('returns false when passed 0', () => {
        expect(isValidPrefParameter(0)).to.equal(false);
    });

    it('returns false when passed 101', () => {
        expect(isValidPrefParameter(101)).to.equal(false);
    });

    it('returns false when passed a float', () => {
        expect(isValidPrefParameter(1.1)).to.equal(false);
    });

    it('returns false when passed Infinity', () => {
        expect(isValidPrefParameter(Infinity)).to.equal(false);
    });

    it('returns false when passed NaN', () => {
        expect(isValidPrefParameter(NaN)).to.equal(false);
    });

    it('returns false when passed a string', () => {
        expect(isValidPrefParameter('100')).to.equal(false);
    });

    it('returns true when passed 1', () => {
        expect(isValidPrefParameter(1)).to.equal(true);
    });

    it('returns true when passed 25', () => {
        expect(isValidPrefParameter(25)).to.equal(true);
    });

    it('returns true when passed 56', () => {
        expect(isValidPrefParameter(56)).to.equal(true);
    });

    it('returns true when passed 77', () => {
        expect(isValidPrefParameter(77)).to.equal(true);
    });

    it('returns true when passed 100', () => {
        expect(isValidPrefParameter(100)).to.equal(true);
    });
});
