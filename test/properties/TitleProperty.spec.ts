import { expect } from 'chai';
import TitleProperty from '../../lib/properties/TitleProperty';

describe('TitleProperty', () => {
    it('is a function class', () => {
        expect(TitleProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(TitleProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const title = new TitleProperty('Research Scientist');

            expect(title.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'Research Scientist';
            const title = new TitleProperty(value);

            expect(title.toString()).to.equal(`TITLE:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { pref: 1 };
            const value = 'Research Scientist';
            const config = { parameters, value };
            const title = new TitleProperty(config);
            const actual = title.toString();
            const expected = 'TITLE;PREF=1:Research Scientist';

            expect(actual).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(TitleProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const title = new TitleProperty('Champion');

            expect(title.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'Champion';
            const title = new TitleProperty(value);

            expect(title.valueOf()).to.equal(value);
        });
    });
});
