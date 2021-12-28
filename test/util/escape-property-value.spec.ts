import { expect } from 'chai';
import escapePropertyValue from '../../lib/util/escape-property-value';

describe('escapePropertyValue', () => {
    it('is a function', () => {
        expect(escapePropertyValue).to.be.a('function');
    });

    describe('when passed a value which contains a backslash (\\) character', () => {
        it('escapes all instances of said character', () => {
            const actual = escapePropertyValue('\\Hello\\World\\');
            const expected = '\\\\Hello\\\\World\\\\';

            expect(actual).to.equal(expected);
        });
    });

    describe('when passed a value which contains a comma (,) character', () => {
        it('escapes all instances of said character', () => {
            const actual = escapePropertyValue('Hi, Hello, World!');
            const expected = 'Hi\\, Hello\\, World!';

            expect(actual).to.equal(expected);
        });
    });

    describe('when passed a value which contains a semicolon (;) character', () => {
        it('escapes all instances of said character', () => {
            const actual = escapePropertyValue('Hi; Hello; World!');
            const expected = 'Hi\\; Hello\\; World!';

            expect(actual).to.equal(expected);
        });
    });

    describe('when passed a value which contains a newline (\\n) character', () => {
        it('escapes all instances of said character', () => {
            const actual = escapePropertyValue('Hi\nHello\nWorld!');
            const expected = 'Hi\\nHello\\nWorld!';

            expect(actual).to.equal(expected);
        });
    });

    describe('when passed a value which contains all escapable characters', () => {
        it('escapes all instances of said characters', () => {
            const actual = escapePropertyValue('\\Hi,\nHello;\nWorld!');
            const expected = '\\\\Hi\\,\\nHello\\;\\nWorld!';

            expect(actual).to.equal(expected);
        });
    });
});
