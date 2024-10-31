import isNumber from './is-number.js';

/**
 * > Purpose:  Used in a multi-valued property to indicate the position of
 * >           this value within the set of values.
 * >
 * > Description:  When a property is multi-valued, INDEX can be used to
 * >               indicate an ordering or sequence of the values.  INDEX
 * >               values must be strictly positive.  Zero is not allowed.
 * >
 * > Format definition:
 * >     INDEX-param =  "INDEX=" INDEX-value
 * >     INDEX-value =  integer
 * >
 * > Examples:
 * >     ORG-URI;INDEX=1:http://mycompany.example1.com
 * >     ORG-URI;PREF=1;INDEX=2:http://mycompany.example2.com
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6715/#section-3.1 RFC 6715 - vCard Format Extensions: Representing vCard Extensions Defined by the Open Mobile Alliance (OMA) Converged Address Book (CAB) Group § Parameter: INDEX}
 */
export default function isValidIndexParameter(value: unknown): boolean {
    return isNumber(value) && Number.isInteger(value) && value >= 1;
}
