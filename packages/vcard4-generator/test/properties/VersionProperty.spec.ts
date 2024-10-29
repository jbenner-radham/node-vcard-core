import { describe, it } from 'vitest';
import { expect } from 'chai';
import VersionProperty, { type VersionRestConfig } from '../../lib/properties/VersionProperty.js';

describe('VersionProperty', () => {
    it('is a class', () => {
        expect(VersionProperty).to.be.a('class');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(VersionProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const version = new VersionProperty();

            expect(version.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = '4.0';
            const version = new VersionProperty(value);

            expect(version.toString()).to.equal(`VERSION:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { value: 'text' as const };
            const value = '4.0';
            const version = new VersionProperty(value, parameters);
            const actual = version.toString();
            const expected = `VERSION;VALUE=text:${value}`;

            expect(actual).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(VersionProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const version = new VersionProperty('4.0');

            expect(version.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = '4.0';
            const version = new VersionProperty(value);

            expect(version.valueOf()).to.equal(value);
        });
    });

    describe('.from()', () => {
        it('is a static method', () => {
            expect(VersionProperty.from).to.be.a('function');
        });

        it('returns an instance of `VersionProperty`', () => {
            const version = VersionProperty.from('4.0');

            expect(version instanceof VersionProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const version = new VersionProperty('4.0');

            expect(VersionProperty.from(version)).to.equal(version);
        });

        it('creates an instance from a string value argument', () => {
            const version = VersionProperty.from('4.0');

            expect(version instanceof VersionProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = '4.0';
            const config: VersionRestConfig = [value, { value: 'text' }];
            const version = VersionProperty.from(config);

            expect(version instanceof VersionProperty).to.equal(true);
        });
    });
});
