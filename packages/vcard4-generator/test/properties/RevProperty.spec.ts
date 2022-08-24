import { expect } from 'chai';
import RevProperty, { RevPropertyRestConfig } from '../../lib/properties/RevProperty';

describe('RevProperty', () => {
    it('is a function class', () => {
        expect(RevProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(RevProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const rev = new RevProperty('19951031T222710Z');

            expect(rev.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = '19951031T222710Z';
            const rev = new RevProperty(value);

            expect(rev.toString()).to.equal(`REV:${value}`);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = '19951031T222710Z';
            const options = { group: 1 };
            const rev = new RevProperty(value, parameters, options);

            expect(rev.toString()).to.equal(`1.REV:${value}`);
        });

        it('accepts a "timestamp" value parameter', () => {
            const parameters = { value: 'timestamp' as const };
            const value = '19951031T222710Z';
            const rev = new RevProperty(value, parameters);

            expect(rev.toString()).to.equal(`REV;VALUE=timestamp:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(RevProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const rev = new RevProperty('19951031T222710Z');

            expect(rev.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = '19951031T222710Z';
            const rev = new RevProperty(value);

            expect(rev.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(RevProperty.factory).to.be.a('function');
        });

        it('returns an instance of `RevProperty`', () => {
            const rev = RevProperty.factory('19951031T222710Z');

            expect(rev instanceof RevProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const rev = new RevProperty('19951031T222710Z');

            expect(RevProperty.factory(rev)).to.equal(rev);
        });

        it('creates an instance from a string value argument', () => {
            const rev = RevProperty.factory('19951031T222710Z');

            expect(rev instanceof RevProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = '19951031T222710Z';
            const config: RevPropertyRestConfig = [value, { value: 'timestamp' }];
            const rev = RevProperty.factory(config);

            expect(rev instanceof RevProperty).to.equal(true);
        });
    });
});
