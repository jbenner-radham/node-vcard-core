import { Cardinality } from '../types';
import Property from './Property';

/** @todo Add Date type support. */
export type BdayPropertyLike = BdayProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the birth date of the object the vCard represents.
 * >
 * > Value type:  The default is a single date-and-or-time value. It can also be reset to a single
 * >   text value.
 * >
 * > ABNF:
 * >   BDAY-param = BDAY-param-date / BDAY-param-text
 * >   BDAY-value = date-and-or-time / text
 * >     ; Value and parameter MUST match.
 * >
 * >   BDAY-param-date = "VALUE=date-and-or-time"
 * >   BDAY-param-text = "VALUE=text" / language-param
 * >
 * >   BDAY-param =/ altid-param / calscale-param / any-param
 * >     ; calscale-param can only be present when BDAY-value is
 * >     ; date-and-or-time and actually contains a date or date-time.
 * >
 * > Examples:
 * >   BDAY:19960415
 * >   BDAY:--0415
 * >   BDAY;19531015T231000Z
 * >   BDAY;VALUE=text:circa 1800
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.5
 */
export default class BdayProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    [VALUE]: string;

    constructor(value: string) {
        super();
        this[VALUE] = value;
    }

    toString() {
        return `BDAY:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: BdayPropertyLike): BdayProperty {
        if (value instanceof BdayProperty) return value;

        if (typeof value === 'string') return new BdayProperty(value);

        throw new TypeError(`The value "${value}" is not a BdayPropertyLike type`);
    }
}
