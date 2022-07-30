import { expect } from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import Vcard4Parser from '../lib';
import PropertyParser from '../lib/PropertyParser';

const readVcardFixture = (basename: string): string => {
    const filepath = path.join(__dirname, 'fixtures', `${basename}.vcf`);

    return fs.readFileSync(filepath, { encoding: 'utf-8' });
};

const SPACE_FOLDED_PROPERTY_VCARD = readVcardFixture('space-folded-property');

describe('@vcard/vcard4-parser > Vcard4Parser', () => {
    it('is a function class', () => {
        expect(Vcard4Parser).to.be.a('function');
    });

    describe('.isLineFolded()', () => {
        it('is a static method', () => {
            expect(Vcard4Parser.isLineFolded).to.be.a('function');
        });

        it('returns a boolean', () => {
            expect(Vcard4Parser.isLineFolded('BEGIN:VCARD')).to.be.a('boolean');
        });

        describe('when provided a non-folded line', () => {
            it('returns false', () => {
                expect(Vcard4Parser.isLineFolded('BEGIN:VCARD')).to.equal(false);
            });
        });

        describe('when provided a folded line', () => {
            it('returns true', () => {
                expect(Vcard4Parser.isLineFolded(' 1234;U.S.A.')).to.equal(true);
            });
        });
    });

    describe('#properties', () => {
        it('is a property containing an array', () => {
            const parser = new Vcard4Parser(SPACE_FOLDED_PROPERTY_VCARD);

            expect(parser.properties).to.be.an('array');
        });

        it('is a property containing an array of `PropertyParser` objects', () => {
            const parser = new Vcard4Parser(SPACE_FOLDED_PROPERTY_VCARD);
            const actual = parser.properties.every(property => property instanceof PropertyParser);

            expect(actual).to.equal(true);
        });

        it('contains each correctly parsed property in a vCard', () => {
            const parser = new Vcard4Parser(SPACE_FOLDED_PROPERTY_VCARD);
            const properties = ['BEGIN', 'VERSION', 'ADR', 'EMAIL', 'FN', 'URL', 'END'];
            const propertyMatches = (property, index) => property.name === properties[index];
            const actual = parser.properties.every(propertyMatches);

            expect(actual).to.equal(true);
        });
    });
});
