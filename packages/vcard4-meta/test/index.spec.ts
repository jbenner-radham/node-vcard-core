import { expect } from 'chai';
import {
    EOL,
    FOLD_CONTINUATION_CHAR,
    FOLD_CONTINUATION_CHARS,
    HORIZONTAL_TAB,
    MAX_OCTETS_PER_LINE,
    SEPARATOR,
    SPACE
} from '../lib';

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

describe('FOLD_CONTINUATION_CHARS', () => {
    it('is an array', () => {
        expect(FOLD_CONTINUATION_CHARS).to.be.an('array');
    });

    it('is an array of strings', () => {
        expect(FOLD_CONTINUATION_CHARS.every(char => typeof char === 'string')).to.equal(true);
    });

    it('is an array of non-empty strings', () => {
        expect(FOLD_CONTINUATION_CHARS.every(char => char.length > 0)).to.equal(true);
    });
});

describe('HORIZONTAL_TAB', () => {
    it('is a string', () => {
        expect(HORIZONTAL_TAB).to.be.a('string');
    });

    it('is a non-empty string', () => {
        expect(HORIZONTAL_TAB.length).to.be.greaterThan(0);
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

describe('SEPARATOR', () => {
    it('is a string', () => {
        expect(SEPARATOR).to.be.a('string');
    });

    it('is a non-empty string', () => {
        expect(SEPARATOR.length).to.be.greaterThan(0);
    });
});

describe('SPACE', () => {
    it('is a string', () => {
        expect(SPACE).to.be.a('string');
    });

    it('is a non-empty string', () => {
        expect(SPACE.length).to.be.greaterThan(0);
    });
});
