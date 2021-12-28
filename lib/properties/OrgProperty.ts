import { Cardinality } from '../types';
import Property from './Property';

export type OrgPropertyLike = OrgProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the organizational name and units associated
 * >   with the vCard.
 * >
 * > Value type:  A single structured text value consisting of components
 * >   separated by the SEMICOLON character (U+003B).
 * >
 * > Special notes:  The property is based on the X.520 Organization Name
 * >   and Organization Unit attributes [CCITT.X520.1988].  The property
 * >   value is a structured type consisting of the organization name,
 * >   followed by zero or more levels of organizational unit names.
 * >
 * >   The SORT-AS parameter MAY be applied to this property.
 * >
 * > ABNF:
 * >   ORG-param = "VALUE=text" / sort-as-param / language-param
 * >             / pid-param / pref-param / altid-param / type-param
 * >             / any-param
 * >   ORG-value = component *(";" component)
 * >
 * > Example:  A property value consisting of an organizational name,
 * >   organizational unit #1 name, and organizational unit #2 name.
 * >
 * >   ORG:ABC\, Inc.;North American Division;Marketing
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.6.4
 */
export default class OrgProperty implements Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(value: string) {
        this[VALUE] = value;
    }

    toString() {
        return `ORG:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: OrgPropertyLike): OrgProperty {
        if (value instanceof OrgProperty) return value;

        if (typeof value === 'string') return new OrgProperty(value);

        throw new TypeError(`The value "${value}" is not a OrgPropertyLike type`);
    }
}
