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
            const nickname = new NicknameProperty('Llama');

            expect(nickname.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'Llama';
            const nickname = new NicknameProperty(value);

            expect(nickname.toString()).to.equal(`NICKNAME:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { type: 'work' as const };
            const value = 'Boss';
            const config = { parameters, value };
            const nickname = new NicknameProperty(config);
            const actual = nickname.toString();
            const expected = 'NICKNAME;TYPE=work:Boss';

            expect(actual).to.equal(expected);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'Boss';
            const config = { parameters, value };
            const nickname = new NicknameProperty(config);

            expect(nickname.toString()).to.equal(`NICKNAME;VALUE=text:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(NicknameProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const nickname = new NicknameProperty('Green');

            expect(nickname.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'Green';
            const nickname = new NicknameProperty(value);

            expect(nickname.valueOf()).to.equal(value);
        });
    });
});
