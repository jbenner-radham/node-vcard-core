import { EOL, FOLD_CONTINUATION_CHAR, MAX_OCTETS_PER_LINE } from '@vcard/vcard4-meta';

/**
 * > Individual lines within vCard are delimited by the [RFC5322] line
 * > break, which is a CRLF sequence (U+000D followed by U+000A). Long
 * > logical lines of text can be split into a multiple-physical-line
 * > representation using the following folding technique. Content lines
 * > SHOULD be folded to a maximum width of 75 octets, excluding the line
 * > break. Multi-octet characters MUST remain contiguous. The rationale
 * > for this folding process can be found in [RFC5322], Section 2.1.1.
 * >
 * > A logical line MAY be continued on the next physical line anywhere
 * > between two characters by inserting a CRLF immediately followed by a
 * > single white space character (space (U+0020) or horizontal tab
 * > (U+0009)).  The folded line MUST contain at least one character. Any
 * > sequence of CRLF followed immediately by a single white space
 * > character is ignored (removed) when processing the content type. For
 * > example, the line:
 * >
 * >   NOTE:This is a long description that exists on a long line.
 * >
 * > can be represented as:
 * >
 * >   NOTE:This is a long description
 * >     that exists on a long line.
 * >
 * > It could also be represented as:
 * >
 * >   NOTE:This is a long descrip
 * >    tion that exists o
 * >    n a long line.
 * >
 * > [...]Folding is done after any content encoding of a type value.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-3.2
 */
export default function foldLine(value: string): string {
    // NOTE: We use spread syntax in this function instead of `String#split()` because the former is Unicode safe.

    const byteLength = (value: string): number => {
        return typeof Blob !== 'undefined'
            ? new Blob([value]).size // Browser implementation
            : Buffer.byteLength(value); // Node.js implementation
    };

    if (byteLength(value) <= MAX_OCTETS_PER_LINE) return value;

    const getIndexedLine = (value: string): [number, string] => {
        const chars = [...value];
        let index = 0;
        let line = '';

        for (
            let currentByteLength = 0;
            currentByteLength < MAX_OCTETS_PER_LINE && index < chars.length;
            index++
        ) {
            const char = chars[index];
            currentByteLength += byteLength(char);

            if (currentByteLength <= MAX_OCTETS_PER_LINE) {
                line += char;
            } else {
                index--;
            }
        }

        return [index, line];
    };

    const chars = [...value];
    const lines = [];
    let charIndex = 0;

    while (charIndex < chars.length) {
        const substring = chars.slice(charIndex).join('');
        const [lineIndex, line] = getIndexedLine(substring);
        charIndex += lineIndex;
        lines.push(line);
    }

    return lines.join(`${EOL}${FOLD_CONTINUATION_CHAR}`);
}

