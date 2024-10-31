import isNumber from './is-number.js';
import { Pref } from '../types.js';

/**
 * > The PREF parameter is OPTIONAL and is used to indicate that the
 * > corresponding instance of a property is preferred by the vCard
 * > author.  Its value MUST be an integer between 1 and 100 that
 * > quantifies the level of preference.  Lower values correspond to a
 * > higher level of preference, with 1 being most preferred.
 * >
 * > When the parameter is absent, the default MUST be to interpret the
 * > property instance as being least preferred.
 * >
 * > Note that the value of this parameter is to be interpreted only in
 * > relation to values assigned to other instances of the same property
 * > in the same vCard.  A given value, or the absence of a value, MUST
 * > NOT be interpreted on its own.
 * >
 * > This parameter MAY be applied to any property that allows multiple
 * > instances.
 * >
 * > ABNF:
 * >         pref-param = "PREF=" (1*2DIGIT / "100")
 * >                              ; An integer between 1 and 100.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-5.3 RFC 6350 - vCard Format Specification § PREF}
 */
export default function isValidPrefParameter(value: unknown): value is Pref {
    return isNumber(value) && Number.isInteger(value) && value >= 1 && value <= 100;
}
