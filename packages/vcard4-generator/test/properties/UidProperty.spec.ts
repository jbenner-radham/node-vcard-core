import { describe, it } from 'vitest';
import { expect } from 'chai';
import UidProperty, { type UidRestConfig } from '../../lib/properties/UidProperty.js';

describe('UidProperty', () => {
    it('is a class', () => {
        expect(UidProperty).to.be.a('class');
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

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6';
            const options = { group: 3 };
            const uid = new UidProperty(value, parameters, options);

            expect(uid.toString()).to.equal(`3.UID:${value}`);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6';
            const uid = new UidProperty(value, parameters);

            expect(uid.toString()).to.equal(`UID;VALUE=uri:${value}`);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = '???'; // TODO: Need to find formal example to test.
            const uid = new UidProperty(value, parameters);

            expect(uid.toString()).to.equal(`UID;VALUE=text:${value}`);
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

    describe('.from()', () => {
        it('is a static method', () => {
            expect(UidProperty.from).to.be.a('function');
        });

        it('returns an instance of `UidProperty`', () => {
            const uid = UidProperty.from('urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6');

            expect(uid instanceof UidProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const uid = new UidProperty('urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6');

            expect(UidProperty.from(uid)).to.equal(uid);
        });

        it('creates an instance from a string value argument', () => {
            const uid = UidProperty.from('urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6');

            expect(uid instanceof UidProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6';
            const config: UidRestConfig = [value, { value: 'uri' }];
            const uid = UidProperty.from(config);

            expect(uid instanceof UidProperty).to.equal(true);
        });
    });
});
