import type { Cardinality, Group, PropertyOptions, Value } from '../types';
import { getInvalidMediatypeValueParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidGroup from '../util/is-valid-group';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';
import { Type } from '../types';

export type TelType = 'cell' | 'fax' | 'pager' | 'text' | 'textphone' | 'video' | 'voice';

export interface TelParameters {
    value?: 'text' | 'uri';
    mediatype?: string; // For `URI` type only!
    type?: (Type | TelType) | (Type | TelType)[];
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    altid?: number | string;
}

export type TelPropertyRestConfig = [value: string, parameters?: TelParameters, options?: PropertyOptions];

export type TelPropertyLike = TelProperty | TelPropertyRestConfig | string;

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

    constructor(value: string, parameters: TelParameters = {}, { group = '' }: PropertyOptions = {}) {
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

    static factory(value: TelPropertyLike): TelProperty {
        if (value instanceof TelProperty) return value;

        if (Array.isArray(value)) return new TelProperty(...value);

        if (isString(value)) return new TelProperty(value);

        throw new TypeError(`The value "${value}" is not a TelPropertyLike type`);
    }

    static validateParameters({ mediatype, pref, value }: TelParameters): void {
        if (mediatype && value && value?.toLowerCase() !== 'uri') {
            throw new TypeError(getInvalidMediatypeValueParameterMessage({ value }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
