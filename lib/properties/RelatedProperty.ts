import isPlainObject from 'lodash.isplainobject';
import { Cardinality, Value } from '../types';
import foldLine from '../util/fold-line';
import isString from '../util/is-string';
import Property from './Property';

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

export interface RelatedParameters {
    value?: 'uri' | 'text';
    mediatype?: string;
    language?: string;
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    altid?: number | string;
    type?: RelatedType;
}

export interface RelatedPropertyConfig {
    value: string;
    parameters?: RelatedParameters;
}

export type RelatedPropertyLike = RelatedProperty | RelatedPropertyConfig | string;

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
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.6.6
 */
export default class RelatedProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    parameters: RelatedParameters = {};

    [VALUE]: string;

    #objectConstructor(config: RelatedPropertyConfig) {
        const { value, parameters = {} } = config;

        RelatedProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;

        return this;
    }

    #stringConstructor(value: string) {
        this[VALUE] = value;

        return this;
    }

    constructor(config: RelatedPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            return this.#objectConstructor(config as RelatedPropertyConfig);
        }

        if (isString(config)) {
            return this.#stringConstructor(config);
        }

        throw new TypeError(`The value "${config}" is not a RelatedPropertyConfig or string type`);
    }

    toString() {
        const parameters = this.getParametersString();
        const value = this.parameters.value !== 'text'
            ? this.valueOf()
            : this.getEscapedValueString();

        return foldLine(`RELATED${parameters}:${value}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: RelatedPropertyLike): RelatedProperty {
        if (value instanceof RelatedProperty) return value;

        if (isPlainObject(value) || isString(value)) return new RelatedProperty(value);

        throw new TypeError(`The value "${value}" is not a RelatedPropertyLike type`);
    }

    static validateParameters(parameters: RelatedParameters): void {
        if (parameters.mediatype && parameters.value && parameters.value?.toLowerCase() !== 'uri') {
            throw new TypeError(
                'The MEDIATYPE parameter is only valid for "uri" value types. ' +
                    `The value type of "${parameters.value}" was provided`
            );
        }

        if (parameters.language && (!parameters.value || parameters.value?.toLowerCase() !== 'text')) {
            throw new TypeError(
                'The LANGUAGE parameter is only valid for "text" value types. ' +
                    `The value type of "${parameters.value}" was provided`
            );
        }
    }
}
