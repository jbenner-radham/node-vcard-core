import { EOL, FOLD_CONTINUATION_CHAR } from '@vcard/vcard4-meta';
import { expect } from 'chai';
import foldLine from '../../lib/util/fold-line';

describe('foldLine', () => {
    it('is a function', () => {
        expect(foldLine).to.be.a('function');
    });

    it('folds a line which is 76 octets', () => {
        const value = `NOTE:${'n'.repeat(71)}`;
        const expected = [`NOTE:${'n'.repeat(70)}`, 'n']
            .join(`${EOL}${FOLD_CONTINUATION_CHAR}`);

        expect(foldLine(value)).to.equal(expected);
    });

    it('folds a line which is 151 octets', () => {
        const value = `NOTE:${'n'.repeat(146)}`;
        const expected = [`NOTE:${'n'.repeat(70)}`, 'n'.repeat(75), 'n']
            .join(`${EOL}${FOLD_CONTINUATION_CHAR}`);

        expect(foldLine(value)).to.equal(expected);
    });

    it('does not split a 4 octet character', () => {
        const value = `NOTE:${'n'.repeat(67)}🤓`;
        const expected = [`NOTE:${'n'.repeat(67)}`, '🤓']
            .join(`${EOL}${FOLD_CONTINUATION_CHAR}`);

        expect(foldLine(value)).to.equal(expected);
    });
});
