import { expect } from 'chai';
import LangProperty from '../../lib/properties/LangProperty';

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
            const config = { parameters, value };
            const lang = new LangProperty(config);
            const actual = lang.toString();
            const expected = 'LANG;PREF=1;TYPE=work:en';

            expect(actual).to.equal(expected);
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
});
