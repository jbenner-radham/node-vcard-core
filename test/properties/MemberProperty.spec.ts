import { expect } from 'chai';
import MemberProperty, { MemberPropertyConfig } from '../../lib/properties/MemberProperty';

describe('MemberProperty', () => {
    it('is a function class', () => {
        expect(MemberProperty).to.be.a('function');
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

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(MemberProperty.factory).to.be.a('function');
        });

        it('returns an instance of `MemberProperty`', () => {
            const member = MemberProperty.factory('mailto:subscriber1@example.com');

            expect(member instanceof MemberProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const member = new MemberProperty('mailto:subscriber1@example.com');

            expect(MemberProperty.factory(member)).to.equal(member);
        });

        it('creates an instance from a string value argument', () => {
            const member = MemberProperty.factory('mailto:subscriber1@example.com');

            expect(member instanceof MemberProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'mailto:subscriber1@example.com';
            const config: MemberPropertyConfig = [value, { value: 'uri' }];
            const member = MemberProperty.factory(config);

            expect(member instanceof MemberProperty).to.equal(true);
        });
    });
});
