import { Cardinality } from '../types';
import Property from './Property';

/** @todo Add URL type support. */
export type LogoPropertyLike = LogoProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify a graphic image of a logo associated with the
 * >   object the vCard represents.
 * >
 * > Value type:  A single URI.
 * >
 * > ABNF:
 * >   LOGO-param = "VALUE=uri" / language-param / pid-param / pref-param
 * >              / type-param / mediatype-param / altid-param / any-param
 * >   LOGO-value = URI
 * >
 * > Examples:
 * >   LOGO:http://www.example.com/pub/logos/abccorp.jpg
 * >
 * >   LOGO:data:image/jpeg;base64,MIICajCCAdOgAwIBAgICBEUwDQYJKoZIhvc
 * >    AQEEBQAwdzELMAkGA1UEBhMCVVMxLDAqBgNVBAoTI05ldHNjYXBlIENvbW11bm
 * >    ljYXRpb25zIENvcnBvcmF0aW9uMRwwGgYDVQQLExNJbmZvcm1hdGlvbiBTeXN0
 * >    <...the remainder of base64-encoded data...>
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.6.3
 */
export default class LogoProperty implements Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(value: string) {
        this[VALUE] = value;
    }

    toString() {
        return `LOGO:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: LogoPropertyLike): LogoProperty {
        if (value instanceof LogoProperty) return value;

        if (typeof value === 'string') return new LogoProperty(value);

        throw new TypeError(`The value "${value}" is not a LogoPropertyLike type`);
    }
}
