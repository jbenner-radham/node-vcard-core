import { expect } from 'chai';
import AnniversaryProperty, { AnniversaryPropertyConfig } from '../../lib/properties/AnniversaryProperty';

describe('AnniversaryProperty', () => {
    it('is a function class', () => {
        expect(AnniversaryProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(AnniversaryProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const anniversary = new AnniversaryProperty('19960415');

            expect(anniversary.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = '19960415';
            const anniversary = new AnniversaryProperty(value);

            expect(anniversary.toString()).to.equal(`ANNIVERSARY:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { calscale: 'gregorian' as const };
            const value = '19960415';
            const anniversary = new AnniversaryProperty(value, parameters);
            const actual = anniversary.toString();
            const expected = 'ANNIVERSARY;CALSCALE=gregorian:19960415';

            expect(actual).to.equal(expected);
        });

        it('accepts a "date-and-or-time" value parameter', () => {
            const parameters = { value: 'date-and-or-time' as const };
            const value = '19960415';
            const anniversary = new AnniversaryProperty(value, parameters);

            expect(anniversary.toString()).to.equal(`ANNIVERSARY;VALUE=date-and-or-time:${value}`);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'circa 2000';
            const anniversary = new AnniversaryProperty(value, parameters);

            expect(anniversary.toString()).to.equal(`ANNIVERSARY;VALUE=text:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(AnniversaryProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const anniversary = new AnniversaryProperty('19960415');

            expect(anniversary.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = '19960415';
            const anniversary = new AnniversaryProperty(value);

            expect(anniversary.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(AnniversaryProperty.factory).to.be.a('function');
        });

        it('returns an instance of `AnniversaryProperty`', () => {
            const anniversary = AnniversaryProperty.factory('19960415');

            expect(anniversary instanceof AnniversaryProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const anniversary = new AnniversaryProperty('19960415');

            expect(AnniversaryProperty.factory(anniversary)).to.equal(anniversary);
        });

        it('creates an instance from a string value argument', () => {
            const anniversary = AnniversaryProperty.factory('19960415');

            expect(anniversary instanceof AnniversaryProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const config: AnniversaryPropertyConfig = ['19960415', { calscale: 'gregorian' }];
            const anniversary = AnniversaryProperty.factory(config);

            expect(anniversary instanceof AnniversaryProperty).to.equal(true);
        });
    });
});
