import isPlainObject from 'lodash.isplainobject';
import { Cardinality, Type, Value } from '../types';
import foldLine from '../util/fold-line';
import isString from '../util/is-string';
import Property from './Property';

export interface LogoParameters {
    value?: 'uri';
    language?: string;
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
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

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    parameters: LogoParameters = {};

    [VALUE]: string;

    #objectConstructor(config: LogoPropertyConfig) {
        const { value, parameters = {} } = config;
        this.parameters = parameters;
        this[VALUE] = value;

        return this;
    }

    #stringConstructor(value: string) {
        this[VALUE] = value;

        return this;
    }

    constructor(config: LogoPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            return this.#objectConstructor(config as LogoPropertyConfig);
        }

        if (isString(config)) {
            return this.#stringConstructor(config);
        }

        throw new TypeError(`The value "${config}" is not a LogoPropertyConfig or string type`);
    }

    toString() {
        return foldLine(`LOGO${this.getParametersString()}:${this.valueOf()}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: LogoPropertyLike): LogoProperty {
        if (value instanceof LogoProperty) return value;

        if (isPlainObject(value) || isString(value)) return new LogoProperty(value);

        throw new TypeError(`The value "${value}" is not a LogoPropertyLike type`);
    }
}
