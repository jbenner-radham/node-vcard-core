import type { Cardinality, Group, PropertyOptions, Type, Value } from '../types';
import { getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidGroup from '../util/is-valid-group';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export interface UrlParameters {
    value?: 'uri';
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
    mediatype?: string;
    altid?: number | string;
}

export type UrlPropertyRestConfig = [value: string, parameters?: UrlParameters, options?: PropertyOptions];

/** @todo Add URL type support. */
export type UrlPropertyLike = UrlProperty | UrlPropertyRestConfig | string;

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
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.8 RFC 6350 - vCard Format Specification § URL}
 */
export default class UrlProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    group: Group;

    parameters: UrlParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: UrlParameters = {}, { group = '' }: PropertyOptions = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        UrlProperty.validateParameters(parameters);
        this.validate(value);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
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

        if (Array.isArray(value)) return new UrlProperty(...value);

        if (isString(value)) return new UrlProperty(value);

        throw new TypeError(`The value "${value}" is not a UrlPropertyLike type`);
    }

    static validateParameters({ pref }: UrlParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
