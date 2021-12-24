import { expect } from 'chai';
import NicknameProperty from '../../lib/properties/NicknameProperty';

describe('NicknameProperty', () => {
    it('is a function class', () => {
        expect(NicknameProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(NicknameProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const title = new NicknameProperty('Llama');

            expect(title.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'Llama';
            const title = new NicknameProperty(value);

            expect(title.toString()).to.equal(`NICKNAME:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(NicknameProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const title = new NicknameProperty('Green');

            expect(title.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'Green';
            const title = new NicknameProperty(value);

            expect(title.valueOf()).to.equal(value);
        });
    });
});
