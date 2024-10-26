import { describe, it } from 'vitest';
import { expect } from 'chai';
import DeathplaceProperty, { type DeathplacePropertyRestConfig } from '../../lib/properties/DeathplaceProperty.js';

describe('DeathplaceProperty', () => {
    it('is a class', () => {
        expect(DeathplaceProperty).to.be.a('class');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(DeathplaceProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const deathplace = new DeathplaceProperty('Aboard the Titanic, near Newfoundland');

            expect(deathplace.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'Aboard the Titanic, near Newfoundland';
            const escapedValue = 'Aboard the Titanic\\, near Newfoundland';
            const deathplace = new DeathplaceProperty(value);

            expect(deathplace.toString()).to.equal(`DEATHPLACE:${escapedValue}`);
        });

        it('accepts a geo URI value', () => {
            const value = 'geo:41.731944,-49.945833';
            const escapedValue = 'geo:41.731944\\,-49.945833';
            const parameters = { value: 'uri' as const };
            const deathplace = new DeathplaceProperty(value, parameters);
            expect(deathplace.toString()).to.equal(`DEATHPLACE;VALUE=uri:${escapedValue}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { value: 'uri' as const };
            const value = 'http://example.com/ships/titanic.vcf';
            const deathplace = new DeathplaceProperty(value, parameters);
            const actual = deathplace.toString();
            const expected = `DEATHPLACE;VALUE=uri:${value}`;

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'http://example.com/ships/titanic.vcf';
            const options = { group: 1 };
            const deathplace = new DeathplaceProperty(value, parameters, options);

            expect(deathplace.toString()).to.equal(`1.DEATHPLACE:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(DeathplaceProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const value = 'Aboard the Titanic, near Newfoundland';
            const deathplace = new DeathplaceProperty(value);

            expect(deathplace.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'Aboard the Titanic, near Newfoundland';
            const deathplace = new DeathplaceProperty(value);

            expect(deathplace.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(DeathplaceProperty.factory).to.be.a('function');
        });

        it('returns an instance of `DeathplaceProperty`', () => {
            const deathplace = DeathplaceProperty.factory('Aboard the Titanic, near Newfoundland');

            expect(deathplace instanceof DeathplaceProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const deathplace = new DeathplaceProperty('Aboard the Titanic, near Newfoundland');

            expect(DeathplaceProperty.factory(deathplace)).to.equal(deathplace);
        });

        it('creates an instance from a string value argument', () => {
            const deathplace = DeathplaceProperty.factory('Aboard the Titanic, near Newfoundland');

            expect(deathplace instanceof DeathplaceProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'geo:41.731944,-49.945833';
            const config: DeathplacePropertyRestConfig = [value, { value: 'uri' }];
            const deathplace = DeathplaceProperty.factory(config);

            expect(deathplace instanceof DeathplaceProperty).to.equal(true);
        });
    });
});
