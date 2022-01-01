import isPlainObject from 'lodash.isplainobject';
import { Cardinality } from '../types';
import Property from './Property';

export interface LogoParameters {
    language?: string;
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: 'home' | 'work' | string;
    mediatype?: string;
    altid?: number | string;
}

export interface LogoPropertyConfig {
    value: string;
    parameters?: LogoParameters;
}

/** @todo Add URL type support. */
export type LogoPropertyLike = LogoProperty | LogoPropertyConfig | string;

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
export default class LogoProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(config: LogoPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as LogoPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (typeof config === 'string') {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a LogoPropertyConfig or string type`);
    }

    toString() {
        return `LOGO${this.getParametersString()}:${this.valueOf()}`;
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
