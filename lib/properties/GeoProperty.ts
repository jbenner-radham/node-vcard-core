import { Cardinality } from '../types';
import Property from './Property';

export type GeoPropertyLike = GeoProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify information related to the global positioning of
 * >   the object the vCard represents.
 * >
 * > Value type:  A single URI.
 * >
 * > Special notes:  The "geo" URI scheme [RFC5870] is particularly well
 * >   suited for this property, but other schemes MAY be used.
 * >
 * > ABNF:
 * >   GEO-param = "VALUE=uri" / pid-param / pref-param / type-param
 * >             / mediatype-param / altid-param / any-param
 * >   GEO-value = URI
 * >
 * > Example:
 * >   GEO:geo:37.386013,-122.082932
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.5.2
 */
export default class GeoProperty implements Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(value: string) {
        this[VALUE] = value;
    }

    toString() {
        return `GEO:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: GeoPropertyLike): GeoProperty {
        if (value instanceof GeoProperty) return value;

        if (typeof value === 'string') return new GeoProperty(value);

        throw new TypeError(`The value "${value}" is not a GeoPropertyLike type`);
    }
}
