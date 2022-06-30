import { expect } from 'chai';
import InterestProperty, { InterestPropertyRestConfig } from '../../lib/properties/InterestProperty';

describe('InterestProperty', () => {
    it('is a function class', () => {
        expect(InterestProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(InterestProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const interest = new InterestProperty('r&b music');

            expect(interest.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'r&b music';
            const interest = new InterestProperty(value);

            expect(interest.toString()).to.equal(`INTEREST:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { index: 1, level: 'medium' as const };
            const value = 'r&b music';
            const interest = new InterestProperty(value, parameters);
            const actual = interest.toString();
            const expected = `INTEREST;INDEX=1;LEVEL=medium:${value}`;

            expect(actual).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(InterestProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const interest = new InterestProperty('r&b music');

            expect(interest.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'r&b music';
            const interest = new InterestProperty(value);

            expect(interest.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(InterestProperty.factory).to.be.a('function');
        });

        it('returns an instance of `InterestProperty`', () => {
            const interest = InterestProperty.factory(`rock 'n' roll music`);

            expect(interest instanceof InterestProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const interest = new InterestProperty(`rock 'n' roll music`);

            expect(InterestProperty.factory(interest)).to.equal(interest);
        });

        it('creates an instance from a string value argument', () => {
            const interest = InterestProperty.factory(`rock 'n' roll music`);

            expect(interest instanceof InterestProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = `rock 'n' roll music`;
            const config: InterestPropertyRestConfig = [value, { index: 2, level: 'high' }];
            const interest = InterestProperty.factory(config);

            expect(interest instanceof InterestProperty).to.equal(true);
        });
    });
});
