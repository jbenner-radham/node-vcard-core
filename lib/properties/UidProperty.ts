import { Cardinality } from '../types';
import Property from './Property';

export type UidPropertyLike = UidProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify a value that represents a globally unique
 * >   identifier corresponding to the entity associated with the vCard.
 * >
 * > Value type:  A single URI value. It MAY also be reset to free-form
 * >   text.
 * >
 * > Special notes:  This property is used to uniquely identify the object
 * >   that the vCard represents.  The "uuid" URN namespace defined in
 * >   [RFC4122] is particularly well suited to this task, but other URI
 * >   schemes MAY be used. Free-form text MAY also be used.
 * >
 * > ABNF:
 * >   UID-param = UID-uri-param / UID-text-param
 * >   UID-value = UID-uri-value / UID-text-value
 * >     ; Value and parameter MUST match.
 * >
 * >   UID-uri-param = "VALUE=uri"
 * >   UID-uri-value = URI
 * >
 * >   UID-text-param = "VALUE=text"
 * >   UID-text-value = text
 * >
 * >   UID-param =/ any-param
 * >
 * > Example:
 * >   UID:urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.6
 */
export default class UidProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    [VALUE]: string;

    constructor(value: string) {
        super();
        this[VALUE] = value;
    }

    toString() {
        return `UID:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: UidPropertyLike): UidProperty {
        if (value instanceof UidProperty) return value;

        if (typeof value === 'string') return new UidProperty(value);

        throw new TypeError(`The value "${value}" is not a UidPropertyLike type`);
    }
}
