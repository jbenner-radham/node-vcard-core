import { Cardinality } from '../types';
import Property from './Property';

export type ProdidPropertyLike = ProdidProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the identifier for the product that created the
 * >   vCard object.
 * >
 * > Value type:  A single text value.
 * >
 * > Special notes:  Implementations SHOULD use a method such as that
 * >   specified for Formal Public Identifiers in [ISO9070] or for
 * >   Universal Resource Names in [RFC3406] to ensure that the text
 * >   value is unique.
 * >
 * > ABNF:
 * >   PRODID-param = "VALUE=text" / any-param
 * >   PRODID-value = text
 * >
 * > Example:
 * >   PRODID:-//ONLINE DIRECTORY//NONSGML Version 1//EN
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.3
 */
export default class ProdidProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    [VALUE]: string;

    constructor(value: string) {
        super();
        this[VALUE] = value;
    }

    toString() {
        return `PRODID:${this.getEscapedValueString()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: ProdidPropertyLike): ProdidProperty {
        if (value instanceof ProdidProperty) return value;

        if (typeof value === 'string') return new ProdidProperty(value);

        throw new TypeError(`The value "${value}" is not a ProdidPropertyLike type`);
    }
}
