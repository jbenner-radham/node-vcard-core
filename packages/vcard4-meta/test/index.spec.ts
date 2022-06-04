import { expect } from 'chai';
import { EOL, FOLD_CONTINUATION_CHAR, MAX_OCTETS_PER_LINE } from '../lib';

describe('EOL', () => {
    it('is a string', () => {
        expect(EOL).to.be.a('string');
    });

    it('is a non-empty string', () => {
        expect(EOL.length).to.be.greaterThan(0);
    });
});

describe('FOLD_CONTINUATION_CHAR', () => {
    it('is a string', () => {
        expect(FOLD_CONTINUATION_CHAR).to.be.a('string');
    });

    it('is a non-empty string', () => {
        expect(FOLD_CONTINUATION_CHAR.length).to.be.greaterThan(0);
    });
});

describe('MAX_OCTETS_PER_LINE', () => {
    it('is a number', () => {
        expect(MAX_OCTETS_PER_LINE).to.be.a('number');
    });

    it('is a positive number', () => {
        expect(MAX_OCTETS_PER_LINE).to.be.greaterThan(0);
    });

    it('is an integer', () => {
        expect(parseInt(MAX_OCTETS_PER_LINE as unknown as string)).to.equal(MAX_OCTETS_PER_LINE);
    });
});
