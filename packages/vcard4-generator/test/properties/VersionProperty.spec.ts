import { expect } from 'chai';
import VersionProperty, { VersionPropertyRestConfig } from '../../lib/properties/VersionProperty';

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

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(VersionProperty.factory).to.be.a('function');
        });

        it('returns an instance of `VersionProperty`', () => {
            const version = VersionProperty.factory('4.0');

            expect(version instanceof VersionProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const version = new VersionProperty('4.0');

            expect(VersionProperty.factory(version)).to.equal(version);
        });

        it('creates an instance from a string value argument', () => {
            const version = VersionProperty.factory('4.0');

            expect(version instanceof VersionProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = '4.0';
            const config: VersionPropertyRestConfig = [value, { value: 'text' }];
            const version = VersionProperty.factory(config);

            expect(version instanceof VersionProperty).to.equal(true);
        });
    });
});
