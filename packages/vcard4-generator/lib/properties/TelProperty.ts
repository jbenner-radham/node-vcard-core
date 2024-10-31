import type { Altid, Cardinality, Group, Pid, Pref, Options, Type, Value } from '../types.js';
import { getInvalidMediatypeValueParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export type TelType = 'cell' | 'fax' | 'pager' | 'text' | 'textphone' | 'video' | 'voice';

type TelCommonParameters = {
    type?: Type | TelType | (Type | TelType)[];
    pid?: Pid;
    pref?: Pref;
    altid?: Altid;
};

type TelUriValueParameters = {
    value: Extract<Value, 'uri'>;
    mediatype?: string;
} & TelCommonParameters;

type TelTextOrUndefinedValueParameters = {
    value?: Extract<Value, 'text'>;
} & TelCommonParameters;

export type TelParameters = TelUriValueParameters | TelTextOrUndefinedValueParameters;

export type TelRestConfig = [value: string, parameters?: TelParameters, options?: Options];

export type TelConfig = TelProperty | TelRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the telephone number for telephony communication
 * >   with the object the vCard represents.
 * >
 * > Value type:  By default, it is a single free-form text value (for
 * >   backward compatibility with vCard 3), but it SHOULD be reset to a
 * >   URI value. It is expected that the URI scheme will be "tel", as
 * >   specified in [RFC3966], but other schemes MAY be used.
 * >
 * > Special notes:  This property is based on the X.520 Telephone Number
 * >   attribute [CCITT.X520.1988].
 * >
 * >   The property can include the "PREF" parameter to indicate a
 * >   preferred-use telephone number.
 * >
 * >   The property can include the parameter "TYPE" to specify intended
 * >   use for the telephone number. The predefined values for the TYPE
 * >   parameter are:
 * >
 * > +-----------+-------------------------------------------------------+
 * > | Value     | Description                                           |
 * > +-----------+-------------------------------------------------------+
 * > | text      | Indicates that the telephone number supports text     |
 * > |           | messages (SMS).                                       |
 * > | voice     | Indicates a voice telephone number.                   |
 * > | fax       | Indicates a facsimile telephone number.               |
 * > | cell      | Indicates a cellular or mobile telephone number.      |
 * > | video     | Indicates a video conferencing telephone number.      |
 * > | pager     | Indicates a paging device telephone number.           |
 * > | textphone | Indicates a telecommunication device for people with  |
 * > |           | hearing or speech difficulties.                       |
 * > +-----------+-------------------------------------------------------+
 * >
 * >   The default type is "voice". These type parameter values can be
 * >   specified as a parameter list (e.g., TYPE=text;TYPE=voice) or as a
 * >   value list (e.g., TYPE="text,voice"). The default can be
 * >   overridden to another set of values by specifying one or more
 * >   alternate values. For example, the default TYPE of "voice" can be
 * >   reset to a VOICE and FAX telephone number by the value list
 * >   TYPE="voice,fax".
 * >
 * >   If this property's value is a URI that can also be used for
 * >   instant messaging, the IMPP (Section 6.4.3) property SHOULD be
 * >   used in addition to this property.
 * >
 * > ABNF:
 * >   TEL-param = TEL-text-param / TEL-uri-param
 * >   TEL-value = TEL-text-value / TEL-uri-value
 * >     ; Value and parameter MUST match.
 * >
 * >   TEL-text-param = "VALUE=text"
 * >   TEL-text-value = text
 * >
 * >   TEL-uri-param = "VALUE=uri" / mediatype-param
 * >   TEL-uri-value = URI
 * >
 * >   TEL-param =/ type-param / pid-param / pref-param / altid-param
 * >              / any-param
 * >
 * >   type-param-tel = "text" / "voice" / "fax" / "cell" / "video"
 * >                  / "pager" / "textphone" / iana-token / x-name
 * >     ; type-param-tel MUST NOT be used with a property other than TEL.
 * >
 * > Example:
 * >   TEL;VALUE=uri;PREF=1;TYPE="voice,home":tel:+1-555-555-5555;ext=5555
 * >   TEL;VALUE=uri;TYPE=home:tel:+33-01-23-45-67
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.4.1 RFC 6350 - vCard Format Specification § TEL}
 */
export default class TelProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: TelParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: TelParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        TelProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: TelConfig): TelProperty {
        if (value instanceof TelProperty) return value;

        if (Array.isArray(value)) return new TelProperty(...value);

        if (isString(value)) return new TelProperty(value);

        throw new TypeError(`The value "${value}" is not a TelConfig type`);
    }

    static validateParameters(parameters: TelParameters): void {
        const { mediatype, pref, value } = parameters as Record<string, unknown>;

        if (mediatype && (!value || (isString(value) && value.toLowerCase() !== 'uri'))) {
            throw new TypeError(getInvalidMediatypeValueParameterMessage({ value }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
