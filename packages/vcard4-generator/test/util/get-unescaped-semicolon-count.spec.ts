import { describe, it } from 'vitest';
import { expect } from 'chai';
import getUnescapedSemicolonCount from '../../lib/util/get-unescaped-semicolon-count.js';

describe('getUnescapedSemicolonCount', () => {
    it('is a function', () => {
        expect(getUnescapedSemicolonCount).to.be.a('function');
    });

    it('returns a number', () => {
        expect(getUnescapedSemicolonCount('')).to.be.a('number');
    });

    it('returns 0 when passed a string without semicolons', () => {
        expect(getUnescapedSemicolonCount('')).to.equal(0);
    });

    it('returns 0 when passed a string with an escaped semicolon', () => {
        expect(getUnescapedSemicolonCount('\\;')).to.equal(0);
    });

    it('returns 5 when passed a string with as many semicolons', () => {
        expect(getUnescapedSemicolonCount('a;b;c;d;e;f')).to.equal(5);
    });

    it('returns 3 when passed a string with as many semicolons and 1 escaped semicolon', () => {
        expect(getUnescapedSemicolonCount('a;b;c;d\\;')).to.equal(3);
    });
});
