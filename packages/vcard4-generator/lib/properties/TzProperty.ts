import type { Altid, Cardinality, Group, Pid, Pref, Options, Type, Value } from '../types.js';
import {
    getInvalidMediatypeValueParameterMessage,
    getInvalidPidParameterMessage,
    getInvalidPrefParameterMessage
} from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPidParameter from '../util/is-valid-pid-parameter.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

type TzCommonParameters = {
    altid?: Altid;
    pid?: Pid;
    pref?: Pref;
    type?: Type;
};

type TzTextOrUtcOffsetOrUndefinedValueParameters = {
    value?: Extract<Value, 'text' | 'utc-offset'>;
} & TzCommonParameters;

type TzUriValueParameters = {
    value: Extract<Value, 'uri'>;
    mediatype?: string;
} & TzCommonParameters;

export type TzParameters = TzTextOrUtcOffsetOrUndefinedValueParameters | TzUriValueParameters;

export type TzRestConfig = [value: string, parameters?: TzParameters, options?: Options];

export type TzConfig = TzProperty | TzRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose: To specify information related to the time zone of the
 * >   object the vCard represents.
 * >
 * > Value type:  The default is a single text value. It can also be
 * >   reset to a single URI or utc-offset value.
 * >
 * > Special notes:  It is expected that names from the public-domain
 * >   Olson database [TZ-DB] will be used, but this is not a
 * >   restriction.  See also [IANA-TZ].
 * >
 * >   Efforts are currently being directed at creating a standard URI
 * >   scheme for expressing time zone information. Usage of such a
 * >   scheme would ensure a high level of interoperability between
 * >   implementations that support it.
 * >
 * >   Note that utc-offset values SHOULD NOT be used because the UTC
 * >   offset varies with time -- not just because of the usual daylight
 * >   saving time shifts that occur in may regions, but often entire
 * >   regions will "re-base" their overall offset.  The actual offset
 * >   may be +/- 1 hour (or perhaps a little more) than the one given.
 * >
 * > ABNF:
 * >   TZ-param = "VALUE=" ("text" / "uri" / "utc-offset")
 * >   TZ-value = text / URI / utc-offset
 * >     ; Value and parameter MUST match.
 * >
 * >   TZ-param =/ altid-param / pid-param / pref-param / type-param
 * >             / mediatype-param / any-param
 * >
 * > Examples:
 * >   TZ:Raleigh/North America
 * >
 * >   TZ;VALUE=utc-offset:-0500
 * >     ; Note: utc-offset format is NOT RECOMMENDED.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.5.1 RFC 6350 - vCard Format Specification § TZ}
 */
export default class TzProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: TzParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: TzParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        TzProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: TzConfig): TzProperty {
        if (value instanceof TzProperty) return value;

        if (Array.isArray(value)) return new TzProperty(...value);

        if (isString(value)) return new TzProperty(value);

        throw new TypeError(`The value "${value}" is not a TzConfig type`);
    }

    static validateParameters(parameters: TzParameters): void {
        const { mediatype, pid, pref, value } = parameters as Record<string, unknown>;

        if (mediatype && (!value || (isString(value) && value.toLowerCase() !== 'uri'))) {
            throw new TypeError(getInvalidMediatypeValueParameterMessage({ value }));
        }

        if (pid !== undefined && !isValidPidParameter(pid)) {
            throw new TypeError(getInvalidPidParameterMessage({ pid }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
