import type { Altid, Cardinality, Group, Pid, Pref, Options, Type, Value } from '../types.js';
import { getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export interface GeoParameters {
    value?: Extract<Value, 'uri'>;
    pid?: Pid;
    pref?: Pref;
    type?: Type;
    mediatype?: string;
    altid?: Altid;
}

export type GeoRestConfig = [value: string, parameters?: GeoParameters, options?: Options];

export type GeoConfig = GeoProperty | GeoRestConfig | string;

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
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.5.2 RFC 6350 - vCard Format Specification § GEO}
 */
export default class GeoProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    group: Group;

    parameters: GeoParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: GeoParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        GeoProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: GeoConfig): GeoProperty {
        if (value instanceof GeoProperty) return value;

        if (Array.isArray(value)) return new GeoProperty(...value);

        if (isString(value)) return new GeoProperty(value);

        throw new TypeError(`The value "${value}" is not a GeoConfig type`);
    }

    static validateParameters({ pref }: GeoParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
