import { Cardinality, Type, Value } from '../types';
import { getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export interface GeoParameters {
    value?: 'uri';
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
    mediatype?: string;
    altid?: number | string;
}

export type GeoPropertyConfig = [value: string, parameters?: GeoParameters];

export type GeoPropertyLike = GeoProperty | GeoPropertyConfig | string;

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
 * >   GEO:geo:37.386013\,-122.082932
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.5.2
 */
export default class GeoProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    parameters: GeoParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: GeoParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        GeoProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: GeoPropertyLike): GeoProperty {
        if (value instanceof GeoProperty) return value;

        if (Array.isArray(value)) return new GeoProperty(...value);

        if (isString(value)) return new GeoProperty(value);

        throw new TypeError(`The value "${value}" is not a GeoPropertyLike type`);
    }

    static validateParameters({ pref }: GeoParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
