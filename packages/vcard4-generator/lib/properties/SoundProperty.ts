import type { Altid, Cardinality, Group, Pid, Pref, Options, Type, Value } from '../types.js';
import { getInvalidPidParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPidParameter from '../util/is-valid-pid-parameter.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export interface SoundParameters {
    value?: Extract<Value, 'uri'>;
    language?: string;
    pid?: Pid;
    pref?: Pref;
    type?: Type;
    mediatype?: string;
    altid?: Altid;
}

export type SoundRestConfig = [value: string, parameters?: SoundParameters, options?: Options];

/** @todo Add URL type support. */
export type SoundConfig = SoundProperty | SoundRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify a digital sound content information that
 * >   annotates some aspect of the vCard. This property is often used
 * >   to specify the proper pronunciation of the name property value of
 * >   the vCard.
 * >
 * > Value type:  A single URI.
 * >
 * > ABNF:
 * >   SOUND-param = "VALUE=uri" / language-param / pid-param / pref-param
 * >               / type-param / mediatype-param / altid-param
 * >               / any-param
 * >   SOUND-value = URI
 * >
 * > Example:
 * >   SOUND:CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com
 * >
 * >   SOUND:data:audio/basic;base64,MIICajCCAdOgAwIBAgICBEUwDQYJKoZIh
 * >    AQEEBQAwdzELMAkGA1UEBhMCVVMxLDAqBgNVBAoTI05ldHNjYXBlIENvbW11bm
 * >    ljYXRpb25zIENvcnBvcmF0aW9uMRwwGgYDVQQLExNJbmZvcm1hdGlvbiBTeXN0
 * >    <...the remainder of base64-encoded data...>
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.5 RFC 6350 - vCard Format Specification § SOUND}
 */
export default class SoundProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    group: Group;

    parameters: SoundParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: SoundParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        SoundProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: SoundConfig): SoundProperty {
        if (value instanceof SoundProperty) return value;

        if (Array.isArray(value)) return new SoundProperty(...value);

        if (isString(value)) return new SoundProperty(value);

        throw new TypeError(`The value "${value}" is not a SoundConfig type`);
    }

    static validateParameters({ pid, pref }: SoundParameters): void {
        if (pid !== undefined && !isValidPidParameter(pid)) {
            throw new TypeError(getInvalidPidParameterMessage({ pid }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
