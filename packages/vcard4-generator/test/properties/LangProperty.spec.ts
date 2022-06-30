import { expect } from 'chai';
import LangProperty, { LangPropertyRestConfig } from '../../lib/properties/LangProperty';

describe('LangProperty', () => {
    it('is a function class', () => {
        expect(LangProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(LangProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const lang = new LangProperty('en');

            expect(lang.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'en';
            const lang = new LangProperty(value);

            expect(lang.toString()).to.equal(`LANG:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { pref: 1, type: 'work' as const };
            const value = 'en';
            const lang = new LangProperty(value, parameters);
            const actual = lang.toString();
            const expected = 'LANG;PREF=1;TYPE=work:en';

            expect(actual).to.equal(expected);
        });

        it('accepts a "language-tag" value parameter', () => {
            const parameters = { value: 'language-tag' as const };
            const value = 'en';
            const lang = new LangProperty(value, parameters);

            expect(lang.toString()).to.equal(`LANG;VALUE=language-tag:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(LangProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const lang = new LangProperty('en');

            expect(lang.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'en';
            const lang = new LangProperty(value);

            expect(lang.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(LangProperty.factory).to.be.a('function');
        });

        it('returns an instance of `LangProperty`', () => {
            const lang = LangProperty.factory('en');

            expect(lang instanceof LangProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const lang = new LangProperty('en');

            expect(LangProperty.factory(lang)).to.equal(lang);
        });

        it('creates an instance from a string value argument', () => {
            const lang = LangProperty.factory('en');

            expect(lang instanceof LangProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'en';
            const config: LangPropertyRestConfig = [value, { type: 'home' }];
            const lang = LangProperty.factory(config);

            expect(lang instanceof LangProperty).to.equal(true);
        });
    });
});
