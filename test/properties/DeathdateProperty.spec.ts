import { expect } from 'chai';
import DeathdateProperty, { DeathdatePropertyConfig }  from '../../lib/properties/DeathdateProperty';

describe('DeathdateProperty', () => {
    it('is a function class', () => {
        expect(DeathdateProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(DeathdateProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const deathdate = new DeathdateProperty('19960415');

            expect(deathdate.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = '19960415';
            const deathdate = new DeathdateProperty(value);

            expect(deathdate.toString()).to.equal(`DEATHDATE:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { value: 'text' as const };
            const value = 'circa 1800';
            const deathdate = new DeathdateProperty(value, parameters);
            const actual = deathdate.toString();
            const expected = `DEATHDATE;VALUE=text:${value}`;

            expect(actual).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(DeathdateProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const deathdate = new DeathdateProperty('--0415');

            expect(deathdate.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = '--0415';
            const deathdate = new DeathdateProperty(value);

            expect(deathdate.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(DeathdateProperty.factory).to.be.a('function');
        });

        it('returns an instance of `DeathdateProperty`', () => {
            const deathdate = DeathdateProperty.factory('19531015T231000Z');

            expect(deathdate instanceof DeathdateProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const deathdate = new DeathdateProperty('19531015T231000Z');

            expect(DeathdateProperty.factory(deathdate)).to.equal(deathdate);
        });

        it('creates an instance from a string value argument', () => {
            const deathdate = DeathdateProperty.factory('19531015T231000Z');

            expect(deathdate instanceof DeathdateProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'circa 1800';
            const config: DeathdatePropertyConfig = [value, { value: 'text' }];
            const deathdate = DeathdateProperty.factory(config);

            expect(deathdate instanceof DeathdateProperty).to.equal(true);
        });
    });
});
