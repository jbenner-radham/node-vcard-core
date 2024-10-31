import type { Altid, Cardinality, Group, Pid, Pref, Options, Type, Value } from '../types.js';
import { getInvalidPidParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPidParameter from '../util/is-valid-pid-parameter.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export interface UrlParameters {
    value?: Extract<Value, 'uri'>;
    pid?: Pid;
    pref?: Pref;
    type?: Type;
    mediatype?: string;
    altid?: Altid;
}

export type UrlRestConfig = [value: string, parameters?: UrlParameters, options?: Options];

/** @todo Add URL type support. */
export type UrlConfig = UrlProperty | UrlRestConfig | string;

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

    constructor(value: string, parameters: UrlParameters = {}, { group = '' }: Options = {}) {
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

    static from(value: UrlConfig): UrlProperty {
        if (value instanceof UrlProperty) return value;

        if (Array.isArray(value)) return new UrlProperty(...value);

        if (isString(value)) return new UrlProperty(value);

        throw new TypeError(`The value "${value}" is not a UrlConfig type`);
    }

    static validateParameters({ pid, pref }: UrlParameters): void {
        if (pid !== undefined && !isValidPidParameter(pid)) {
            throw new TypeError(getInvalidPidParameterMessage({ pid }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
