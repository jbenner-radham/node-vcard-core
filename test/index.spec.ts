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

        describe('when passed a minimal vCard with a ANNIVERSARY property', () => {
            it('returns the proper string format', () => {
                const fn = 'Example McExampleton';
                const anniversary = '19960415';
                const vcard = new Vcard({ anniversary, fn });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `ANNIVERSARY:${anniversary}`,
                    `FN:${fn}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a CALURI property', () => {
            it('returns the proper string format', () => {
                const fn = 'Example McExampleton';
                const caluri = 'http://cal.example.com/calA';
                const vcard = new Vcard({ caluri, fn });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `CALURI:${caluri}`,
                    `FN:${fn}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a CALADRURI property', () => {
            it('returns the proper string format', () => {
                const fn = 'J. Doe';
                const caladruri = 'http://example.com/calendar/jdoe';
                const vcard = new Vcard({ caladruri, fn });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `CALADRURI:${caladruri}`,
                    `FN:${fn}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a CATEGORIES property', () => {
            it('returns the proper string format', () => {
                const fn = 'J. Doe';
                const categories = 'INTERNET,IETF,INDUSTRY,INFORMATION TECHNOLOGY';
                const vcard = new Vcard({ categories, fn });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `CATEGORIES:${categories}`,
                    `FN:${fn}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a BDAY property', () => {
            it('returns the proper string format', () => {
                const fn = 'Example McExampleton';
                const bday = '19960415';
                const vcard = new Vcard({ bday, fn });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `BDAY:${bday}`,
                    `FN:${fn}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
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

        describe('when passed a minimal vCard with a FBURL property', () => {
            it('returns the proper string format', () => {
                const fn = 'Jane Doe';
                const fburl = 'http://www.example.com/busy/janedoe';
                const vcard = new Vcard({ fburl, fn });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FBURL:${fburl}`,
                    `FN:${fn}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a GEO property', () => {
            it('returns the proper string format', () => {
                const geo = 'geo:37.386013,-122.082932';
                const fn = 'Jane Doe';
                const vcard = new Vcard({ fn, geo });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `GEO:${geo}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a IMPP property', () => {
            it('returns the proper string format', () => {
                const impp = 'xmpp:alice@example.com';
                const fn = 'Alice Example';
                const vcard = new Vcard({ fn, impp });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `IMPP:${impp}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a KEY property', () => {
            it('returns the proper string format', () => {
                const fn = 'J. Doe';
                const key = 'http://www.example.com/keys/jdoe.cer';
                const vcard = new Vcard({ fn, key });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `KEY:${key}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a LANG property', () => {
            it('returns the proper string format', () => {
                const fn = 'J. Doe';
                const lang = 'en';
                const vcard = new Vcard({ fn, lang });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `LANG:${lang}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a LOGO property', () => {
            it('returns the proper string format', () => {
                const fn = 'J. Doe';
                const logo = 'http://www.example.com/pub/logos/abccorp.jpg';
                const vcard = new Vcard({ fn, logo });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `LOGO:${logo}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a MEMBER property', () => {
            it('returns the proper string format', () => {
                const fn = 'Funky distribution list';
                const kind = 'group';
                const member = 'mailto:subscriber1@example.com';
                const vcard = new Vcard({ fn, kind, member });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `KIND:${kind}`,
                    `MEMBER:${member}`,
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

        describe('when passed a minimal vCard with a NOTE property', () => {
            it('returns the proper string format', () => {
                const fn = 'J. Doe';
                const note = 'Available Mon-Fri.';
                const vcard = new Vcard({ fn, note });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `NOTE:${note}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a ORG property', () => {
            it('returns the proper string format', () => {
                const fn = 'J. Doe';
                const org = 'Acme Inc.';
                const vcard = new Vcard({ fn, org });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `ORG:${org}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a PHOTO property', () => {
            it('returns the proper string format', () => {
                const fn = 'J. Q. Public';
                const photo = 'http://www.example.com/pub/photos/jqpublic.gif';
                const vcard = new Vcard({ fn, photo });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `PHOTO:${photo}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a PRODID property', () => {
            it('returns the proper string format', () => {
                const fn = 'J. Doe';
                const prodid = '-//ONLINE DIRECTORY//NONSGML Version 1//EN';
                const vcard = new Vcard({ fn, prodid });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `PRODID:${prodid}`,
                    'END:VCARD'
                ].join(Vcard.EOL);

                expect(actual).to.equal(expected);
            });
        });

        describe('when passed a minimal vCard with a ROLE property', () => {
            it('returns the proper string format', () => {
                const fn = 'J. Doe';
                const role = 'Project Leader';
                const vcard = new Vcard({ fn, role });
                const actual = vcard.toString();
                const expected = [
                    'BEGIN:VCARD',
                    'VERSION:4.0',
                    `FN:${fn}`,
                    `ROLE:${role}`,
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
