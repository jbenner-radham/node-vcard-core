import { Cardinality, Type, Value } from '../types';
import { getInvalidMediatypeValueParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages';
import foldLine from '../util/fold-line';
import isString from '../util/is-string';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export interface KeyParameters {
    value?: 'uri' | 'text';
    mediatype?: string; // For `URI` type only!
    altid?: number | string;
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
}

export type KeyPropertyConfig = [value: string, parameters?: KeyParameters];

/** @todo Add URL type support? */
export type KeyPropertyLike = KeyProperty | KeyPropertyConfig | string;

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
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.8.1
 */
export default class KeyProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    parameters: KeyParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: KeyParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        KeyProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    toString() {
        const value = this.parameters.value !== 'text'
            ? this.valueOf()
            : this.getEscapedValueString();

        return foldLine(`KEY${this.getParametersString()}:${value}`);
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
