import { expect } from 'chai';
import LogoProperty from '../../lib/properties/LogoProperty';

describe('LogoProperty', () => {
    it('is a function class', () => {
        expect(LogoProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(LogoProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const logo = new LogoProperty('http://www.example.com/pub/logos/abccorp.jpg');

            expect(logo.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'http://www.example.com/pub/logos/abccorp.jpg';
            const logo = new LogoProperty(value);

            expect(logo.toString()).to.equal(`LOGO:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { pref: 1, type: 'work' as const };
            const value = 'en';
            const config = { parameters, value };
            const logo = new LogoProperty(config);
            const actual = logo.toString();
            const expected = 'LOGO;PREF=1;TYPE=work:en';

            expect(actual).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(LogoProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const logo = new LogoProperty('http://www.example.com/pub/logos/abccorp.jpg');

            expect(logo.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'http://www.example.com/pub/logos/abccorp.jpg';
            const logo = new LogoProperty(value);

            expect(logo.valueOf()).to.equal(value);
        });
    });
});
