import { describe, expect, it } from 'vitest';
import isValidPidParameter from '../../lib/util/is-valid-pid-parameter.js';

describe('isValidPidParameter', () => {
    it('is a function', () => {
        expect(isValidPidParameter).toBeTypeOf('function');
    });

    it('returns true when passed 1', () => {
        expect(isValidPidParameter(1)).toBe(true);
    });

    it('returns true when passed 1.2', () => {
        expect(isValidPidParameter(1.2)).toBe(true);
    });

    it('returns true when passed an array of floats', () => {
        expect(isValidPidParameter([1.1, 1.2, 1.3])).toBe(true);
    });

    it('returns false when passed 13', () => {
        expect(isValidPidParameter(13)).toBe(false);
    });

    it('returns false when passed 55.5', () => {
        expect(isValidPidParameter(55.5)).toBe(false);
    });

    it('returns false when passed 2.34', () => {
        expect(isValidPidParameter(2.34)).toBe(false);
    });

    it('returns false when passed an array of floats containing 3.45', () => {
        expect(isValidPidParameter([1.2, 3.45])).toBe(false);
    });

    it('returns false when passed Infinity', () => {
        expect(isValidPidParameter(Infinity)).toBe(false);
    });

    it('returns false when passed Nan', () => {
        expect(isValidPidParameter(NaN)).toBe(false);
    });

    it('returns false when passed a string', () => {
        expect(isValidPidParameter('number')).toBe(false);
    });

    it('returns false when passed an array with a number and a string', () => {
        expect(isValidPidParameter([1, '2'])).toBe(false);
    });

    it('returns a boolean', () => {
        expect(isValidPidParameter(NaN)).toBeTypeOf('boolean');
    });
});
