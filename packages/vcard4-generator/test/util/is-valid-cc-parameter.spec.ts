import { describe, expect, it } from 'vitest';
import isValidCcParameter from '../../lib/util/is-valid-cc-parameter.js';

describe('isValidCcParameter', () => {
    it('is a function', () => {
        expect(isValidCcParameter).toBeTypeOf('function');
    });

    it('returns true when passed US', () => {
        expect(isValidCcParameter('US')).toBe(true);
    });

    it('returns false when passed us', () => {
        expect(isValidCcParameter('us')).toBe(false);
    });

    it('returns false when passed USA', () => {
        expect(isValidCcParameter('USA')).toBe(false);
    });

    it('returns true when passed JP', () => {
        expect(isValidCcParameter('JP')).toBe(true);
    });

    it('returns true when passed IT', () => {
        expect(isValidCcParameter('IT')).toBe(true);
    });

    it('returns true when passed DE', () => {
        expect(isValidCcParameter('DE')).toBe(true);
    });

    it('returns a boolean', () => {
        expect(isValidCcParameter('...')).toBeTypeOf('boolean');
    });
});
