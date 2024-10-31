import type { Altid, Cardinality, Group, Pid, Pref, Options, Value } from '../types.js';
import {
    getInvalidLanguageValueParameterMessage,
    getInvalidMediatypeValueParameterMessage,
    getInvalidPidParameterMessage,
    getInvalidPrefParameterMessage
} from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPidParameter from '../util/is-valid-pid-parameter.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export type RelatedType = 'acquaintance'
    | 'agent'
    | 'child'
    | 'co-resident'
    | 'co-worker'
    | 'colleague'
    | 'contact'
    | 'crush'
    | 'date'
    | 'emergency'
    | 'friend'
    | 'kin'
    | 'me'
    | 'met'
    | 'muse'
    | 'neighbor'
    | 'parent'
    | 'sibling'
    | 'spouse'
    | 'sweetheart';

type RelatedCommonParameters = {
    pid?: Pid;
    pref?: Pref;
    altid?: Altid;
    type?: RelatedType;
};

type RelatedUriOrUndefinedValueParameters = {
    value?: Extract<Value, 'uri'>;
    mediatype?: string;
} & RelatedCommonParameters;

type RelatedTextValueParameters = {
    value: Extract<Value, 'text'>;
    language?: string;
} & RelatedCommonParameters;

export type RelatedParameters = RelatedUriOrUndefinedValueParameters | RelatedTextValueParameters;

export type RelatedRestConfig = [value: string, parameters?: RelatedParameters, options?: Options];

export type RelatedConfig = RelatedProperty | RelatedRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify a relationship between another entity and the
 * >   entity represented by this vCard.
 * >
 * > Value type:  A single URI. It can also be reset to a single text
 * >   value. The text value can be used to specify textual information.
 * >
 * > Special notes:  The TYPE parameter MAY be used to characterize the
 * >   related entity. It contains a comma-separated list of values that
 * >   are registered with IANA as described in Section 10.2. The
 * >   registry is pre-populated with the values defined in [xfn]. This
 * >   document also specifies two additional values:
 * >
 * >   agent:  an entity who may sometimes act on behalf of the entity
 * >     associated with the vCard.
 * >
 * >   emergency:  indicates an emergency contact
 * >
 * > ABNF:
 * >   RELATED-param = RELATED-param-uri / RELATED-param-text
 * >   RELATED-value = URI / text
 * >     ; Parameter and value MUST match.
 * >
 * >   RELATED-param-uri = "VALUE=uri" / mediatype-param
 * >   RELATED-param-text = "VALUE=text" / language-param
 * >
 * >   RELATED-param =/ pid-param / pref-param / altid-param / type-param
 * >                  / any-param
 * >
 * >   type-param-related = related-type-value *("," related-type-value)
 * >     ; type-param-related MUST NOT be used with a property other than
 * >     ; RELATED.
 * >
 * >   related-type-value = "contact" / "acquaintance" / "friend" / "met"
 * >                      / "co-worker" / "colleague" / "co-resident"
 * >                      / "neighbor" / "child" / "parent"
 * >                      / "sibling" / "spouse" / "kin" / "muse"
 * >                      / "crush" / "date" / "sweetheart" / "me"
 * >                      / "agent" / "emergency"
 * >
 * > Examples:
 * >   RELATED;TYPE=friend:urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6
 * >
 * >   RELATED;TYPE=contact:http://example.com/directory/jdoe.vcf
 * >
 * >   RELATED;TYPE=co-worker;VALUE=text:Please contact my assistant Jane
 * >    Doe for any inquiries.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.6.6 RFC 6350 - vCard Format Specification § RELATED}
 */
export default class RelatedProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    group: Group;

    parameters: RelatedParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: RelatedParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        RelatedProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: RelatedConfig): RelatedProperty {
        if (value instanceof RelatedProperty) return value;

        if (Array.isArray(value)) return new RelatedProperty(...value);

        if (isString(value)) return new RelatedProperty(value);

        throw new TypeError(`The value "${value}" is not a RelatedConfig type`);
    }

    static validateParameters(parameters: RelatedParameters): void {
        const { language, mediatype, pid, pref, value } = parameters as Record<string, unknown>;

        if (language && (!value || (isString(value) && value.toLowerCase() !== 'text'))) {
            throw new TypeError(getInvalidLanguageValueParameterMessage({ value }));
        }

        if (mediatype && isString(value) && value.toLowerCase() !== 'uri') {
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
