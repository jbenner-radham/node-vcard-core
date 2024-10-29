import { describe, it } from 'vitest';
import { expect } from 'chai';
import MemberProperty, { type MemberRestConfig } from '../../lib/properties/MemberProperty.js';

describe('MemberProperty', () => {
    it('is a class', () => {
        expect(MemberProperty).to.be.a('class');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(MemberProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const member = new MemberProperty('mailto:subscriber1@example.com');

            expect(member.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'mailto:subscriber1@example.com';
            const member = new MemberProperty(value);

            expect(member.toString()).to.equal(`MEMBER:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { pref: 1 };
            const value = 'mailto:subscriber1@example.com';
            const member = new MemberProperty(value, parameters);
            const actual = member.toString();
            const expected = 'MEMBER;PREF=1:mailto:subscriber1@example.com';

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'mailto:subscriber1@example.com';
            const options = { group: 1 };
            const member = new MemberProperty(value, parameters, options);

            expect(member.toString()).to.equal(`1.MEMBER:${value}`);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'mailto:subscriber1@example.com';
            const member = new MemberProperty(value, parameters);

            expect(member.toString()).to.equal(`MEMBER;VALUE=uri:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(MemberProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const member = new MemberProperty('mailto:subscriber1@example.com');

            expect(member.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'mailto:subscriber1@example.com';
            const member = new MemberProperty(value);

            expect(member.valueOf()).to.equal(value);
        });
    });

    describe('.from()', () => {
        it('is a static method', () => {
            expect(MemberProperty.from).to.be.a('function');
        });

        it('returns an instance of `MemberProperty`', () => {
            const member = MemberProperty.from('mailto:subscriber1@example.com');

            expect(member instanceof MemberProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const member = new MemberProperty('mailto:subscriber1@example.com');

            expect(MemberProperty.from(member)).to.equal(member);
        });

        it('creates an instance from a string value argument', () => {
            const member = MemberProperty.from('mailto:subscriber1@example.com');

            expect(member instanceof MemberProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'mailto:subscriber1@example.com';
            const config: MemberRestConfig = [value, { value: 'uri' }];
            const member = MemberProperty.from(config);

            expect(member instanceof MemberProperty).to.equal(true);
        });
    });
});
