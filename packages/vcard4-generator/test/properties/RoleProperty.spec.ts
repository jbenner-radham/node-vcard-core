import { describe, it } from 'vitest';
import { expect } from 'chai';
import RoleProperty, { type RoleRestConfig } from '../../lib/properties/RoleProperty.js';

describe('RoleProperty', () => {
    it('is a class', () => {
        expect(RoleProperty).to.be.a('class');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(RoleProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const role = new RoleProperty('Project Leader');

            expect(role.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'Project Leader';
            const role = new RoleProperty(value);

            expect(role.toString()).to.equal(`ROLE:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { language: 'en' };
            const value = 'Project Leader';
            const role = new RoleProperty(value, parameters);
            const actual = role.toString();
            const expected = `ROLE;LANGUAGE=en:${value}`;

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'Project Leader';
            const options = { group: 1 };
            const role = new RoleProperty(value, parameters, options);

            expect(role.toString()).to.equal(`1.ROLE:${value}`);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'Project Leader';
            const role = new RoleProperty(value, parameters);

            expect(role.toString()).to.equal(`ROLE;VALUE=text:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(RoleProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const role = new RoleProperty('Project Leader');

            expect(role.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'Project Leader';
            const role = new RoleProperty(value);

            expect(role.valueOf()).to.equal(value);
        });
    });

    describe('.from()', () => {
        it('is a static method', () => {
            expect(RoleProperty.from).to.be.a('function');
        });

        it('returns an instance of `RoleProperty`', () => {
            const role = RoleProperty.from('Project Leader');

            expect(role instanceof RoleProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const role = new RoleProperty('Project Leader');

            expect(RoleProperty.from(role)).to.equal(role);
        });

        it('creates an instance from a string value argument', () => {
            const role = RoleProperty.from('Project Leader');

            expect(role instanceof RoleProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'Project Leader';
            const config: RoleRestConfig = [value, { type: 'work' }];
            const role = RoleProperty.from(config);

            expect(role instanceof RoleProperty).to.equal(true);
        });
    });
});
