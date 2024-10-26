import { describe, it } from 'vitest';
import { expect } from 'chai';
import NicknameProperty, { type NicknamePropertyRestConfig } from '../../lib/properties/NicknameProperty.js';

describe('NicknameProperty', () => {
    it('is a class', () => {
        expect(NicknameProperty).to.be.a('class');
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
            const nickname = new NicknameProperty(value, parameters);
            const actual = nickname.toString();
            const expected = 'NICKNAME;TYPE=work:Boss';

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = { type: 'work' as const };
            const value = 'Boss';
            const options = { group: 'office' };
            const nickname = new NicknameProperty(value, parameters, options);

            expect(nickname.toString()).to.equal(`OFFICE.NICKNAME;TYPE=work:${value}`);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'Boss';
            const nickname = new NicknameProperty(value, parameters);

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

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(NicknameProperty.factory).to.be.a('function');
        });

        it('returns an instance of `NicknameProperty`', () => {
            const nickname = NicknameProperty.factory('Boss');

            expect(nickname instanceof NicknameProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const nickname = new NicknameProperty('Boss');

            expect(NicknameProperty.factory(nickname)).to.equal(nickname);
        });

        it('creates an instance from a string value argument', () => {
            const nickname = NicknameProperty.factory('Boss');

            expect(nickname instanceof NicknameProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'Boss';
            const config: NicknamePropertyRestConfig = [value, { type: 'work' }];
            const nickname = NicknameProperty.factory(config);

            expect(nickname instanceof NicknameProperty).to.equal(true);
        });
    });
});
