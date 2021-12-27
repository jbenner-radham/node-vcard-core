import { expect } from 'chai';
import MemberProperty from '../../lib/properties/MemberProperty';

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
});
