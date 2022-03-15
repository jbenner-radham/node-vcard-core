import { expect } from 'chai';
import HobbyProperty, { HobbyPropertyConfig }  from '../../lib/properties/HobbyProperty';

describe('HobbyProperty', () => {
    it('is a function class', () => {
        expect(HobbyProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(HobbyProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const hobby = new HobbyProperty('reading');

            expect(hobby.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'reading';
            const hobby = new HobbyProperty(value);

            expect(hobby.toString()).to.equal(`HOBBY:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { level: 'high' as const };
            const value = 'reading';
            const hobby = new HobbyProperty(value, parameters);
            const actual = hobby.toString();
            const expected = `HOBBY;LEVEL=high:${value}`;

            expect(actual).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(HobbyProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const hobby = new HobbyProperty('sewing');

            expect(hobby.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'sewing';
            const hobby = new HobbyProperty(value);

            expect(hobby.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(HobbyProperty.factory).to.be.a('function');
        });

        it('returns an instance of `HobbyProperty`', () => {
            const hobby = HobbyProperty.factory('sewing');

            expect(hobby instanceof HobbyProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const hobby = new HobbyProperty('sewing');

            expect(HobbyProperty.factory(hobby)).to.equal(hobby);
        });

        it('creates an instance from a string value argument', () => {
            const hobby = HobbyProperty.factory('sewing');

            expect(hobby instanceof HobbyProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'sewing';
            const config: HobbyPropertyConfig = [value, { index: 2, level: 'high' }];
            const hobby = HobbyProperty.factory(config);

            expect(hobby instanceof HobbyProperty).to.equal(true);
        });
    });
});
