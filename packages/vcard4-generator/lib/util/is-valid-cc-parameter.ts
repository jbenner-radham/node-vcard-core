import type { Cc } from '../types.js';
import isString from './is-string.js';

/**
 * > Purpose: ICANN requires the use of ISO 3166 [ISO.3166.1988] two-
 * > letter codes, not "country names", in RDAP entity responses.  This
 * > parameter is used to extend the ADR property described in
 * > Section 6.3.1 of RFC 6350 [RFC6350].
 * >
 * > Description: This parameter contains the ISO 3166 [ISO.3166.1988]
 * > two-character country code associated with the "country name" ADR
 * > component described in Section 6.3.1 of RFC 6350 [RFC6350].
 * >
 * > Format definition:
 * >    CC-param = "CC=" 2ALPHA
 * >
 * > Examples:
 * >    ADR;TYPE=work;CC=US:;;54321 Oak St;Reston;VA;20190;USA
 * >    ADR;TYPE=home;CC=US:;;12345 Elm St;Reston;VA;20190;USA
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc8605/#section-3.1 RFC 8605 - vCard Format Extensions: ICANN Extensions for the Registration Data Access Protocol (RDAP) § Parameter: CC}
 */
export default function isValidCcParameter(value: unknown): value is Cc {
    if (!isString(value)) return false;

    if (value.length !== 2) return false;

    const uppercaseAlphaChars = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
    ];

    return [...value].every(char => uppercaseAlphaChars.includes(char));
}
