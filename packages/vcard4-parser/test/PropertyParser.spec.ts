import { afterAll, beforeAll, describe, it } from 'vitest';
import { expect } from 'chai';
import * as sinon from 'sinon';
import PropertyParser from '../lib/PropertyParser.js';

describe('@vcard/vcard4-parser > PropertyParser', () => {
    beforeAll(() => {
        // Silence the warning from `#isAllowed()`.
        sinon.replace(console, 'warn', sinon.fake());
    });

    afterAll(() => {
        sinon.restore();
    });

    it('is a function class', () => {
        expect(PropertyParser).to.be.a('function');
    });

    describe('#getName()', () => {
        it('is a method', () => {
            expect(PropertyParser.prototype.getName).to.be.a('function');
        });

        it('returns a string', () => {
            const parser = new PropertyParser('FN:Alex Awesome');

            expect(parser.getName()).to.be.a('string');
        });

        it('returns the name of a property with no parameters', () => {
            const parser = new PropertyParser('FN:Alex Awesome');

            expect(parser.getName()).to.equal('FN');
        });

        it('returns the name of a property with parameters', () => {
            const parser = new PropertyParser('GEO;TYPE=work:geo:46.772673,-71.282945');

            expect(parser.getName()).to.equal('GEO');
        });
    });

    describe('#getParameters()', () => {
        it('is a method', () => {
            expect(PropertyParser.prototype.getParameters).to.be.a('function');
        });

        it('returns a object', () => {
            const parser = new PropertyParser('GEO;TYPE=work:geo:46.772673,-71.282945');

            expect(parser.getParameters()).to.be.an('object');
        });

        it('returns the parameter when a single one is present', () => {
            const parser = new PropertyParser('GEO;TYPE=work:geo:46.772673,-71.282945');

            expect(parser.getParameters()).to.deep.equal({ type: 'work' });
        });

        it('returns all parameters when multiple are present', () => {
            const parser = new PropertyParser('TEL;VALUE=uri;TYPE=home:tel:+33-01-23-45-67');

            expect(parser.getParameters()).to.deep.equal({ type: 'home', value: 'uri' });
        });
    });

    describe('#getRawValue()', () => {
        it('is a method', () => {
            expect(PropertyParser.prototype.getRawValue).to.be.a('function');
        });

        it('returns a string', () => {
            const parser = new PropertyParser('FN:Alex Awesome');

            expect(parser.getRawValue()).to.be.a('string');
        });

        it('returns the value of a property', () => {
            const parser = new PropertyParser('FN:Alex Awesome');

            expect(parser.getRawValue()).to.equal('Alex Awesome');
        });
    });

    describe('#getUnescapedValue()', () => {
        it('is a method', () => {
            expect(PropertyParser.prototype.getUnescapedValue).to.be.a('function');
        });

        it('is returns a string', () => {
            const property = 'SOURCE:ldap://ldap.example.com/cn=Babs%20Jensen\,%20o=Babsco\,%20c=US';
            const parser = new PropertyParser(property);

            expect(parser.getUnescapedValue()).to.be.a('string');
        });

        it('is returns an unescaped value', () => {
            const value = 'ldap://ldap.example.com/cn=Babs%20Jensen\,%20o=Babsco\,%20c=US';
            const property = `SOURCE:${value}`;
            const parser = new PropertyParser(property);

            expect(parser.getUnescapedValue()).to.be.a('string');
        });
    });

    describe('#getUnquotedColonIndex()', () => {
        it('is a method', () => {
            expect(PropertyParser.prototype.getUnquotedColonIndex).to.be.a('function');
        });

        it('returns a number', () => {
            const parser = new PropertyParser();

            expect(parser.getUnquotedColonIndex()).to.be.a('number');
        });

        it('returns -1 when no colon is present', () => {
            const parser = new PropertyParser();

            expect(parser.getUnquotedColonIndex()).to.equal(-1);
        });

        it('returns the index of a colon', () => {
            const parser = new PropertyParser('FN:Alex Awesome');

            expect(parser.getUnquotedColonIndex()).to.equal(2);
        });

        it('returns the index of an unquoted colon when quoted colons are present', () => {
            const property = [
                'ADR;GEO="geo:12.3457,78.910";LABEL="Mr. John Q. Public, Esq.\n',
                'Mail Drop: TNE QB\n123 Main Street\nAny Town, CA  91921-1234\n',
                'U.S.A.":;;123 Main Street;Any Town;CA;91921-1234;U.S.A.'
            ].join('');
            const parser = new PropertyParser(property);

            expect(parser.getUnquotedColonIndex()).to.equal(127);
        });
    });

    describe('#isAllowed()', () => {
        it('is a method', () => {
            expect(PropertyParser.prototype.isAllowed).to.be.a('function');
        });

        it('returns a boolean', () => {
            const property = new PropertyParser('FN:Alex Awesome');

            expect(property.isAllowed()).to.be.a('boolean');
        });

        describe('when provided an allowed property', () => {
            it('returns true', () => {
                const property = new PropertyParser('FN:Alex Awesome');

                expect(property.isAllowed()).to.equal(true);
            });
        });

        describe('when provided a disallowed property', () => {
            it('returns false', () => {
                const property = new PropertyParser('X-NAME:Alex Awesome');

                expect(property.isAllowed()).to.equal(false);
            });
        });
    });
});
