import { expect } from 'chai';
import Vcard from '../lib';

describe('Vcard', () => {
    it('is a function class', () => {
        expect(Vcard).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(Vcard.prototype.toString).to.be.a('function');
        });

        it('returns the proper string format', () => {
            const fn = 'Bella';
            const vcard = new Vcard({ fn });
            const actual = vcard.toString();
            const expected = [
                'BEGIN:VCARD',
                'VERSION:4.0',
                `FN:${fn}`,
                'END:VCARD'
            ].join(Vcard.EOL);

            expect(actual).to.equal(expected);
        });

        describe('when passed a minimal vCard with a EMAIL property', () => {
            it('returns the proper string format', () => {
                const fn = 'Example McExampleton';
                const email = 'hello@example.com';
                const vcard = new Vcard({ email, fn });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `EMAIL:${email}`,
                    `FN:${fn}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a NICKNAME property', () => {
            it('returns the proper string format', () => {
                const fn = 'Bobby Tables';
                const nickname = 'Little Bobby Tables';
                const vcard = new Vcard({ fn, nickname });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `NICKNAME:${nickname}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a TITLE property', () => {
            it('returns the proper string format', () => {
                const fn = 'Captain Awesome';
                const title = 'Rockstar';
                const vcard = new Vcard({ fn, title });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `TITLE:${title}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a URL property', () => {
            it('returns the proper string format', () => {
                const fn = 'Captain Awesome';
                const url = 'http://www.example.com/';
                const vcard = new Vcard({ fn, url });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `URL:${url}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });
    });
});
