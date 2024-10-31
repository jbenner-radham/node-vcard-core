import isNumber from './is-number.js';
import { Pid } from '../types.js';

/**
 * > The PID parameter is used to identify a specific property among
 * > multiple instances.  It plays a role analogous to the UID property
 * > (Section 6.7.6) on a per-property instead of per-vCard basis.  It MAY
 * > appear more than once in a given property.  It MUST NOT appear on
 * > properties that may have only one instance per vCard.  Its value is
 * > either a single small positive integer or a pair of small positive
 * > integers separated by a dot.  Multiple values may be encoded in a
 * > single PID parameter by separating the values with a comma ",".  See
 * > Section 7 for more details on its usage.
 * >
 * > ABNF:
 * >         pid-param = "PID=" pid-value *("," pid-value)
 * >         pid-value = 1*DIGIT ["." 1*DIGIT]
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-5.5 RFC 6350 - vCard Format Specification § PID}
 */
export default function isValidPidParameter(value: unknown): value is Pid {
    if ((!isNumber(value) && !Array.isArray(value)) || (Array.isArray(value) && !value.every(isNumber))) return false;

    function isValidPidNumber(number: number): boolean {
        const numbers = number.toString()
            .split('.')
            .map(Number);

        const isValidNumbersLength = (numbers: number[]): boolean => numbers.length === 1 || numbers.length === 2;

        if (!isValidNumbersLength(numbers)) return false;

        const isDigit = (number: number): boolean => number >= 0 && number <= 9;

        return numbers.every(isDigit);
    }

    if (isNumber(value)) return isValidPidNumber(value);

    return value.every(isValidPidNumber);
}
