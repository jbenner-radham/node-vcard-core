import isPlainObject from 'lodash.isplainobject';
import { Cardinality } from '../types';
import Property from './Property';

export interface GeoParameters {
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: 'home' | 'work' | string;
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

    [VALUE]: string;

    constructor(config: GeoPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as GeoPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (typeof config === 'string') {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a GeoPropertyConfig or string type`);
    }

    toString() {
        return `GEO${this.getParametersString()}:${this.valueOf()}`;
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
