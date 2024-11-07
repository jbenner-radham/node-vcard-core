import type { Altid, Cardinality, CommonParameters, Group, Pid, Pref, Options, Type, Value } from '../types.js';
import { getInvalidPidParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPidParameter from '../util/is-valid-pid-parameter.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export type ImppParameters = {
    value?: Extract<Value, 'uri'>;
    pid?: Pid;
    pref?: Pref;
    type?: Type;
    mediatype?: string;
    altid?: Altid;
} & CommonParameters;

export type ImppRestConfig = [value: string, parameters?: ImppParameters, options?: Options];

export type ImppConfig = ImppProperty | ImppRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the URI for instant messaging and presence
 * >   protocol communications with the object the vCard represents.
 * >
 * > Value type:  A single URI.
 * >
 * > Special notes:  The property may include the "PREF" parameter to
 * >   indicate that this is a preferred address and has the same
 * >   semantics as the "PREF" parameter in a TEL property.
 * >   If this property's value is a URI that can be used for voice
 * >   and/or video, the TEL property (Section 6.4.1) SHOULD be used in
 * >   addition to this property.
 * >
 * >   This property is adapted from [RFC4770], which is made obsolete by
 * >   this document.
 * >
 * > ABNF:
 * >   IMPP-param = "VALUE=uri" / pid-param / pref-param / type-param
 * >              / mediatype-param / altid-param / any-param
 * >   IMPP-value = URI
 * >
 * > Example:
 * >   IMPP;PREF=1:xmpp:alice@example.com
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.4.3 RFC 6350 - vCard Format Specification § IMPP}
 */
export default class ImppProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    group: Group;

    parameters: ImppParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: ImppParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        ImppProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: ImppConfig): ImppProperty {
        if (value instanceof ImppProperty) return value;

        if (Array.isArray(value)) return new ImppProperty(...value);

        if (isString(value)) return new ImppProperty(value);

        throw new TypeError(`The value "${value}" is not a ImppConfig type`);
    }

    static validateParameters({ pid, pref }: ImppParameters): void {
        if (pid !== undefined && !isValidPidParameter(pid)) {
            throw new TypeError(getInvalidPidParameterMessage({ pid }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
