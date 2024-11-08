import type { Altid, Cardinality, CommonParameters, Group, Pid, Pref, Options, Type, Value } from '../types.js';
import { getInvalidPidParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPidParameter from '../util/is-valid-pid-parameter.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export type LogoParameters = {
    value?: Extract<Value, 'uri'>;
    language?: string;
    pid?: Pid;
    pref?: Pref;
    type?: Type;
    mediatype?: string;
    altid?: Altid;
} & CommonParameters;

export type LogoRestConfig = [value: string, parameters?: LogoParameters, options?: Options];

/** @todo Add URL type support. */
export type LogoConfig = LogoProperty | LogoRestConfig | string;

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
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.6.3 RFC 6350 - vCard Format Specification § LOGO}
 */
export default class LogoProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    group: Group;

    parameters: LogoParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: LogoParameters = {}, { group = '' }: Options = {}) {
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

    static from(value: LogoConfig): LogoProperty {
        if (value instanceof LogoProperty) return value;

        if (Array.isArray(value)) return new LogoProperty(...value);

        if (isString(value)) return new LogoProperty(value);

        throw new TypeError(`The value "${value}" is not a LogoConfig type`);
    }

    static validateParameters({ pid, pref }: LogoParameters): void {
        if (pid !== undefined && !isValidPidParameter(pid)) {
            throw new TypeError(getInvalidPidParameterMessage({ pid }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
