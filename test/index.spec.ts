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
                'FN:Bella',
                'END:VCARD'
            ].join(Vcard.EOL);

            expect(actual).to.equal(expected);
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
                    'FN:Captain Awesome',
                    'URL:http://www.example.com/',
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });
    });
});
