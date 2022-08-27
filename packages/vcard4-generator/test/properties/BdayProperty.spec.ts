import { expect } from 'chai';
import BdayProperty, { BdayPropertyRestConfig } from '../../lib/properties/BdayProperty';

describe('BdayProperty', () => {
    it('is a function class', () => {
        expect(BdayProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(BdayProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const bday = new BdayProperty('--0415');

            expect(bday.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = '--0415';
            const bday = new BdayProperty(value);

            expect(bday.toString()).to.equal(`BDAY:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { calscale: 'gregorian' as const };
            const value = '19960415';
            const bday = new BdayProperty(value, parameters);
            const actual = bday.toString();
            const expected = 'BDAY;CALSCALE=gregorian:19960415';

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = '19960415';
            const options = { group: 1 };
            const bday = new BdayProperty(value, parameters, options);

            expect(bday.toString()).to.equal(`1.BDAY:${value}`);
        });

        it('accepts a "date-and-or-time" value parameter', () => {
            const parameters = { value: 'date-and-or-time' as const };
            const value = '19960415';
            const bday = new BdayProperty(value, parameters);

            expect(bday.toString()).to.equal(`BDAY;VALUE=date-and-or-time:${value}`);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'circa 1800';
            const bday = new BdayProperty(value, parameters);

            expect(bday.toString()).to.equal(`BDAY;VALUE=text:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(BdayProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const bday = new BdayProperty('19531015T231000Z');

            expect(bday.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = '19531015T231000Z';
            const bday = new BdayProperty(value);

            expect(bday.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(BdayProperty.factory).to.be.a('function');
        });

        it('returns an instance of `BdayProperty`', () => {
            const bday = BdayProperty.factory('--0415');

            expect(bday instanceof BdayProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const bday = new BdayProperty('--0415');

            expect(BdayProperty.factory(bday)).to.equal(bday);
        });

        it('creates an instance from a string value argument', () => {
            const bday = BdayProperty.factory('--0415');

            expect(bday instanceof BdayProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const config: BdayPropertyRestConfig = ['--0415', { value: 'date-and-or-time' }];
            const bday = BdayProperty.factory(config);

            expect(bday instanceof BdayProperty).to.equal(true);
        });
    });
});
