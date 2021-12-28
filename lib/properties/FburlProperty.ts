import { Cardinality } from '../types';
import Property from './Property';

/** @todo Add URL type support? */
export type FburlPropertyLike = FburlProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the URI for the busy time associated with the
 * >   object that the vCard represents.
 * >
 * > Value type:  A single URI value.
 * >
 * > Special notes:  Where multiple FBURL properties are specified, the
 * >   default FBURL property is indicated with the PREF parameter.  The
 * >   FTP [RFC1738] or HTTP [RFC2616] type of URI points to an iCalendar
 * >   [RFC5545] object associated with a snapshot of the next few weeks
 * >   or months of busy time data.  If the iCalendar object is
 * >   represented as a file or document, its file extension should be
 * >   ".ifb".
 * >
 * > ABNF:
 * >   FBURL-param = "VALUE=uri" / pid-param / pref-param / type-param
 * >               / mediatype-param / altid-param / any-param
 * >   FBURL-value = URI
 * >
 * > Examples:
 * >   FBURL;PREF=1:http://www.example.com/busy/janedoe
 * >   FBURL;MEDIATYPE=text/calendar:ftp://example.com/busy/project-a.ifb
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.9.1
 */
export default class FburlProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(value: string) {
        super();
        this[VALUE] = value;
    }

    toString() {
        return `FBURL:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: FburlPropertyLike): FburlProperty {
        if (value instanceof FburlProperty) return value;

        if (typeof value === 'string') return new FburlProperty(value);

        throw new TypeError(`The value "${value}" is not a FburlPropertyLike type`);
    }
}
