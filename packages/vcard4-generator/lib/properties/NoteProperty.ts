import type { Cardinality, Group, Pref, PropertyOptions, Type, Value } from '../types.js';
import { getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export interface NoteParameters {
    value?: 'text';
    language?: string;
    pid?: number | number[];
    pref?: Pref;
    type?: Type;
    altid?: number | string;
}

export type NoteRestConfig = [value: string, parameters?: NoteParameters, options?: PropertyOptions];

export type NoteConfig = NoteProperty | NoteRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify supplemental information or a comment that is
 * >   associated with the vCard.
 * >
 * > Value type:  A single text value.
 * >
 * > Special notes:  The property is based on the X.520 Description
 * >   attribute [CCITT.X520.1988].
 * >
 * > ABNF:
 * >   NOTE-param = "VALUE=text" / language-param / pid-param / pref-param
 * >              / type-param / altid-param / any-param
 * >   NOTE-value = text
 * >
 * > Example:
 * >   NOTE:This fax number is operational 0800 to 1715
 * >     EST\, Mon-Fri.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.2 RFC 6350 - vCard Format Specification § NOTE}
 */
export default class NoteProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: NoteParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: NoteParameters = {}, { group = '' }: PropertyOptions = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        NoteProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: NoteConfig): NoteProperty {
        if (value instanceof NoteProperty) return value;

        if (Array.isArray(value)) return new NoteProperty(...value);

        if (isString(value)) return new NoteProperty(value);

        throw new TypeError(`The value "${value}" is not a NoteConfig type`);
    }

    static validateParameters({ pref }: NoteParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
