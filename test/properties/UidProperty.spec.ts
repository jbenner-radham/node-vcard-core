import { expect } from 'chai';
import UidProperty from '../../lib/properties/UidProperty';

describe('UidProperty', () => {
    it('is a function class', () => {
        expect(UidProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(UidProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const uid = new UidProperty('urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6');

            expect(uid.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6';
            const uid = new UidProperty(value);

            expect(uid.toString()).to.equal(`UID:${value}`);
        });

        it('accepts an object argument to the constructor', () => {
            const value = 'urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6';
            const config = { value };
            const uid = new UidProperty(config);
            const actual = uid.toString();
            const expected = 'UID:urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6';

            expect(actual).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(UidProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const uid = new UidProperty('urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6');

            expect(uid.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6';
            const uid = new UidProperty(value);

            expect(uid.valueOf()).to.equal(value);
        });
    });
});
