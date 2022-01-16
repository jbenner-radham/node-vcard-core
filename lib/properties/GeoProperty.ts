import isPlainObject from 'lodash.isplainobject';
import { Cardinality, Type, Value } from '../types';
import foldLine from '../util/fold-line';
import isString from '../util/is-string';
import Property from './Property';

export interface GeoParameters {
    value?: 'uri';
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
    mediatype?: string;
    altid?: number | string;
}

export interface GeoPropertyConfig {
    value: string;
    parameters?: GeoParameters;
}

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
 * >   GEO:geo:37.386013,-122.082932
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.5.2
 */
export default class GeoProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    parameters: GeoParameters = {};

    [VALUE]: string;

    #objectConstructor(config: GeoPropertyConfig) {
        const { value, parameters = {} } = config;
        this.parameters = parameters;
        this[VALUE] = value;

        return this;
    }

    #stringConstructor(value: string) {
        this[VALUE] = value;

        return this;
    }

    constructor(config: GeoPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            return this.#objectConstructor(config as GeoPropertyConfig);
        }

        if (isString(config)) {
            return this.#stringConstructor(config);
        }

        throw new TypeError(`The value "${config}" is not a GeoPropertyConfig or string type`);
    }

    toString() {
        return foldLine(`GEO${this.getParametersString()}:${this.valueOf()}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: GeoPropertyLike): GeoProperty {
        if (value instanceof GeoProperty) return value;

        if (isPlainObject(value) || isString(value)) return new GeoProperty(value);

        throw new TypeError(`The value "${value}" is not a GeoPropertyLike type`);
    }
}
