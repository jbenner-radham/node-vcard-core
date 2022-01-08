import isPlainObject from 'lodash.isplainobject';
import isString from '../util/is-string';
import { Cardinality, Type } from '../types';
import Property from './Property';

export interface UrlParameters {
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
    mediatype?: string;
    altid?: number | string;
}

export interface UrlPropertyConfig {
    value: string;
    parameters?: UrlParameters;
}

/** @todo Add URL type support. */
export type UrlPropertyLike = UrlProperty | UrlPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify a uniform resource locator associated with the
 * >   object to which the vCard refers. Examples for individuals
 * >   include personal web sites, blogs, and social networking site
 * >   identifiers.
 * >
 * > Value type:  A single uri value.
 * >
 * > ABNF:
 * >   URL-param = "VALUE=uri" / pid-param / pref-param / type-param
 * >             / mediatype-param / altid-param / any-param
 * >   URL-value = URI
 * >
 * > Example:
 * >   URL:http://example.org/restaurant.french/~chezchic.html
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.8
 */
export default class UrlProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(config: UrlPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as UrlPropertyConfig;
            this.parameters = parameters;
            this.validate(value);
            this[VALUE] = value;

            return;
        }

        if (isString(config)) {
            this.parameters = {};
            this.validate(config);
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a UrlPropertyConfig or string type`);
    }

    toString() {
        return `URL${this.getParametersString()}:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    validate(value: string): void {
        try {
            new URL(value);
        } catch (_) {
            throw new TypeError(`The value "${value}" is not a valid URL format`);
        }
    }

    static factory(value: UrlPropertyLike): UrlProperty {
        if (value instanceof UrlProperty) return value;

        if (isPlainObject(value) || isString(value)) return new UrlProperty(value);

        throw new TypeError(`The value "${value}" is not a UrlPropertyLike type`);
    }
}
