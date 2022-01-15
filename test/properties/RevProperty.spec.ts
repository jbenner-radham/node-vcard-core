import { expect } from 'chai';
import RevProperty from '../../lib/properties/RevProperty';

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

        it('accepts an object argument to the constructor', () => {
            const value = '19951031T222710Z';
            const config = { value };
            const rev = new RevProperty(config);

            expect(rev.toString()).to.equal(`REV:${value}`);
        });

        it('accepts a "timestamp" value parameter', () => {
            const parameters = { value: 'timestamp' as const };
            const value = '19951031T222710Z';
            const config = { parameters, value };
            const rev = new RevProperty(config);

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
});
