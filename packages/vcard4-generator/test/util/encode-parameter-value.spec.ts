import { expect } from 'chai';
import encodeParameterValue from '../../lib/util/encode-parameter-value';

describe('encodeParameterValue', () => {
    it('is a function', () => {
        expect(encodeParameterValue).to.be.a('function');
    });

    it('returns a string', () => {
        expect(encodeParameterValue('')).to.be.a('string');
    });

    it('encodes line feeds (\\n)', () => {
        const value = 'Pittsburgh Pirates\n115 Federal St\nPittsburgh, PA 15212';
        const actual = encodeParameterValue(value);
        const expected = 'Pittsburgh Pirates^n115 Federal St^nPittsburgh, PA 15212';

        expect(actual).to.equal(expected);
    });

    it('encodes carriage return line feeds (\\r\\n)', () => {
        const value = 'Pittsburgh Pirates\r\n115 Federal St\r\nPittsburgh, PA 15212';
        const actual = encodeParameterValue(value);
        const expected = 'Pittsburgh Pirates^n115 Federal St^nPittsburgh, PA 15212';

        expect(actual).to.equal(expected);
    });

    it('encodes circumflex accents (^)', () => {
        const value = '^ up here';
        const actual = encodeParameterValue(value);
        const expected = '^^ up here';

        expect(actual).to.equal(expected);
    });

    it('encodes quotation marks (")', () => {
        const value = 'They said "hello world!"';
        const actual = encodeParameterValue(value);
        const expected = `They said ^'hello world!^'`;

        expect(actual).to.equal(expected);
    });

    it('should retain quotes around a value if they are present', () => {
        const value = '"Pittsburgh Pirates\n115 Federal St\nPittsburgh, PA 15212"';
        const actual = encodeParameterValue(value);
        const expected = '"Pittsburgh Pirates^n115 Federal St^nPittsburgh, PA 15212"';

        expect(actual).to.equal(expected);
    });
});
