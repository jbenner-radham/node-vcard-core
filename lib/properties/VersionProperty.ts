import { Cardinality } from '../types';
import Property from './Property';

export type VersionPropertyLike = VersionProperty | number;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the version of the vCard specification used to
 * >   format this vCard.
 * >
 * > Value type:  A single text value.
 * >
 * > Special notes:  This property MUST be present in the vCard object,
 * >   and it must appear immediately after BEGIN:VCARD. The value MUST
 * >   be "4.0" if the vCard corresponds to this specification. Note
 * >   that earlier versions of vCard allowed this property to be placed
 * >   anywhere in the vCard object, or even to be absent.
 * >
 * > ABNF:
 * >   VERSION-param = "VALUE=text" / any-param
 * >   VERSION-value = "4.0"
 * >
 * > Example:
 * >   VERSION:4.0
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.9
 */
export default class VersionProperty extends Property {
    static readonly CARDINALITY: Cardinality = '1'; // Exactly one instance per vCard MUST be present.

    [VALUE]: number;

    constructor(value = 4) {
        super();
        this[VALUE] = value;
    }

    toString() {
        return `VERSION:${this.valueOf().toFixed(1)}`;
    }

    valueOf(): number {
        return this[VALUE];
    }

    static factory(value: VersionPropertyLike): VersionProperty {
        if (value instanceof VersionProperty) return value;

        if (typeof value === 'string') return new VersionProperty(value);

        throw new TypeError(`The value "${value}" is not a VersionPropertyLike type`);
    }
}
