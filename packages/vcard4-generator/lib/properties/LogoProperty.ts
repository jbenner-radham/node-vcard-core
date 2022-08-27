import type { Cardinality, Group, PropertyOptions, Type, Value } from '../types';
import { getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidGroup from '../util/is-valid-group';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
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

export type LogoPropertyRestConfig = [value: string, parameters?: LogoParameters, options?: PropertyOptions];

/** @todo Add URL type support. */
export type LogoPropertyLike = LogoProperty | LogoPropertyRestConfig | string;

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

    group: Group;

    parameters: LogoParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: LogoParameters = {}, { group = '' }: PropertyOptions = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        LogoProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: LogoPropertyLike): LogoProperty {
        if (value instanceof LogoProperty) return value;

        if (Array.isArray(value)) return new LogoProperty(...value);

        if (isString(value)) return new LogoProperty(value);

        throw new TypeError(`The value "${value}" is not a LogoPropertyLike type`);
    }

    static validateParameters({ pref }: LogoParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
