import { Cardinality } from '../types';
import Property from './Property';

/** @todo Add URL type support? */
export type KeyPropertyLike = KeyProperty | string;

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

    constructor(value: string) {
        super();
        this[VALUE] = value;
    }

    toString() {
        return `KEY:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: KeyPropertyLike): KeyProperty {
        if (value instanceof KeyProperty) return value;

        if (typeof value === 'string') return new KeyProperty(value);

        throw new TypeError(`The value "${value}" is not a KeyPropertyLike type`);
    }
}
