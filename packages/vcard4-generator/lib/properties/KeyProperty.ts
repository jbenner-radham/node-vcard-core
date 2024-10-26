import type { Cardinality, Group, Pref, PropertyOptions, Type, Value } from '../types.js';
import { getInvalidMediatypeValueParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export interface KeyParameters {
    value?: 'uri' | 'text';
    mediatype?: string; // For `URI` type only!
    altid?: number | string;
    pid?: number | number[];
    pref?: Pref;
    type?: Type;
}

export type KeyPropertyRestConfig = [value: string, parameters?: KeyParameters, options?: PropertyOptions];

/** @todo Add URL type support? */
export type KeyPropertyLike = KeyProperty | KeyPropertyRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify a public key or authentication certificate
 * >   associated with the object that the vCard represents.
 * >
 * > Value type:  A single URI. It can also be reset to a text value.
 * >
 * > ABNF:
 * >   KEY-param = KEY-uri-param / KEY-text-param
 * >   KEY-value = KEY-uri-value / KEY-text-value
 * >     ; Value and parameter MUST match.
 * >
 * >   KEY-uri-param = "VALUE=uri" / mediatype-param
 * >   KEY-uri-value = URI
 * >
 * >   KEY-text-param = "VALUE=text"
 * >   KEY-text-value = text
 * >
 * >   KEY-param =/ altid-param / pid-param / pref-param / type-param
 * >              / any-param
 * >
 * > Examples:
 * >   KEY:http://www.example.com/keys/jdoe.cer
 * >
 * >   KEY;MEDIATYPE=application/pgp-keys:ftp://example.com/keys/jdoe
 * >
 * >   KEY:data:application/pgp-keys;base64,MIICajCCAdOgAwIBAgICBE
 * >    UwDQYJKoZIhvcNAQEEBQAwdzELMAkGA1UEBhMCVVMxLDAqBgNVBAoTI05l
 * >    <... remainder of base64-encoded data ...>
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.8.1 RFC 6350 - vCard Format Specification § KEY}
 */
export default class KeyProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    group: Group;

    parameters: KeyParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: KeyParameters = {}, { group = '' }: PropertyOptions = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        KeyProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: KeyPropertyLike): KeyProperty {
        if (value instanceof KeyProperty) return value;

        if (Array.isArray(value)) return new KeyProperty(...value);

        if (isString(value)) return new KeyProperty(value);

        throw new TypeError(`The value "${value}" is not a KeyPropertyLike type`);
    }

    static validateParameters({ mediatype, pref, value }: KeyParameters): void {
        if (mediatype && value && value?.toLowerCase() !== 'uri') {
            throw new TypeError(getInvalidMediatypeValueParameterMessage({ value }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
