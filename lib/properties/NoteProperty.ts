import { Cardinality } from '../types';
import Property from './Property';

export type NotePropertyLike = NoteProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify supplemental information or a comment that is associated with the vCard.
 * >
 * > Value type:  A single text value.
 * >
 * > Special notes:  The property is based on the X.520 Description attribute [CCITT.X520.1988].
 * >
 * > ABNF:
 * >   NOTE-param = "VALUE=text" / language-param / pid-param / pref-param
 * >              / type-param / altid-param / any-param
 * >   NOTE-value = text
 * >
 * > Example:
 * >   NOTE:This fax number is operational 0800 to 1715
 * >     EST\, Mon-Fri.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.2
 */
export default class NoteProperty implements Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(value: string) {
        this[VALUE] = value;
    }

    toString() {
        return `NOTE:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: NotePropertyLike): NoteProperty {
        if (value instanceof NoteProperty) return value;

        if (typeof value === 'string') return new NoteProperty(value);

        throw new TypeError(`The value "${value}" is not a NotePropertyLike type`);
    }
}
