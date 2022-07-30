import { expect } from 'chai';
import sinon from 'sinon';
import ParameterParser from '../lib/ParameterParser';

describe('@vcard/vcard4-parser > ParameterParser', () => {
    before(() => {
        // Silence the warning from `#isAllowedFor()`.
        sinon.replace(console, 'warn', sinon.fake());
    });

    after(() => {
        sinon.restore();
    });

    it('is a function class', () => {
        expect(ParameterParser).to.be.a('function');
    });

    describe('#getDecodedValue()', () => {
        it('is a method', () => {
            expect(ParameterParser.prototype.getDecodedValue).to.be.a('function');
        });

        it('returns a string', () => {
            const parameter = new ParameterParser('GEO="geo:12.3457,78.910"');

            expect(parameter.getDecodedValue()).to.be.a('string');
        });

        describe('when provided an unencoded value', () => {
            it('returns the value', () => {
                const parameter = new ParameterParser('GEO="geo:12.3457,78.910"');

                expect(parameter.getDecodedValue()).to.equal('"geo:12.3457,78.910"');
            });
        });

        describe('when provided an encoded value', () => {
            it('returns the decoded value', () => {
                const parameter = new ParameterParser([
                    'LABEL="Mr. John Q. Public, Esq.^n',
                    'Mail Drop: TNE QB^n123 Main Street^nAny Town, CA  91921-1234^n',
                    'U.S.A."'
                ].join(''));
                const expected = [
                    '"Mr. John Q. Public, Esq.\n',
                    'Mail Drop: TNE QB\n123 Main Street\nAny Town, CA  91921-1234\n',
                    'U.S.A."'
                ].join('');

                expect(parameter.getDecodedValue()).to.equal(expected);
            });
        });
    });

    describe('#getName()', () => {
        it('is a method', () => {
            expect(ParameterParser.prototype.getName).to.be.a('function');
        });

        it('returns a string', () => {
            const parameter = new ParameterParser('GEO="geo:12.3457,78.910"');

            expect(parameter.getName()).to.be.a('string');
        });

        it('returns the name', () => {
            const parameter = new ParameterParser('GEO="geo:12.3457,78.910"');

            expect(parameter.getName()).to.equal('GEO');
        });
    });

    describe('#getRawValue()', () => {
        it('is a method', () => {
            expect(ParameterParser.prototype.getRawValue).to.be.a('function');
        });

        it('returns a string', () => {
            const parameter = new ParameterParser('GEO="geo:12.3457,78.910"');

            expect(parameter.getRawValue()).to.be.a('string');
        });

        it('returns the raw value', () => {
            const parameter = new ParameterParser([
                'LABEL="Mr. John Q. Public, Esq.^n',
                'Mail Drop: TNE QB^n123 Main Street^nAny Town, CA  91921-1234^n',
                'U.S.A."'
            ].join(''));
            const expected = [
                '"Mr. John Q. Public, Esq.^n',
                'Mail Drop: TNE QB^n123 Main Street^nAny Town, CA  91921-1234^n',
                'U.S.A."'
            ].join('');

            expect(parameter.getRawValue()).to.equal(expected);
        });
    });

    describe('#isAllowedFor()', () => {
        it('is a method', () => {
            expect(ParameterParser.prototype.isAllowedFor).to.be.a('function');
        });

        it('returns a boolean', () => {
            const parameter = new ParameterParser('GEO="geo:12.3457,78.910"');

            expect(parameter.isAllowedFor('ADR')).to.be.a('boolean');
        });

        describe('when provided an allowed property', () => {
            it('returns true', () => {
                const parameter = new ParameterParser('GEO="geo:12.3457,78.910"');

                expect(parameter.isAllowedFor('ADR')).to.equal(true);
            });
        });

        describe('when provided a disallowed property', () => {
            it('returns false', () => {
                const parameter = new ParameterParser('GEO="geo:12.3457,78.910"');

                expect(parameter.isAllowedFor('BEGIN')).to.equal(false);
            });
        });
    });
});
