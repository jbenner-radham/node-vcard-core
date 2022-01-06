import isPlainObject from 'lodash.isplainobject';
import isString from '../util/is-string';
import { Cardinality } from '../types';
import Property from './Property';

export interface KeyParameters {
    mediatype?: string; // For `URI` type only!
    altid?: number | string;
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: 'home' | 'work';
}

export interface KeyPropertyConfig {
    value: string;
    parameters?: KeyParameters;
}

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

    [VALUE]: string;

    constructor(config: KeyPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as KeyPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (isString(config)) {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a KeyPropertyConfig or string type`);
    }

    toString() {
        return `KEY${this.getParametersString()}:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: KeyPropertyLike): KeyProperty {
        if (value instanceof KeyProperty) return value;

        if (isPlainObject(value) || isString(value)) return new KeyProperty(value);

        throw new TypeError(`The value "${value}" is not a KeyPropertyLike type`);
    }
}
