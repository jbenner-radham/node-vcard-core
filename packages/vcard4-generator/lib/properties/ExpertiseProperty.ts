import type { Cardinality, Group, Pref, Options, Type, Value } from '../types.js';
import { getInvalidIndexParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';
import isValidIndexParameter from '../util/is-valid-index-parameter.js';

export type ExpertiseLevel = 'beginner' | 'average' | 'expert';

export interface ExpertiseParameters {
    altid?: number | string;
    index?: number; // > INDEX values must be strictly positive. Zero is not allowed. _(integer)_
    language?: string;
    level?: ExpertiseLevel;
    pref?: Pref;
    type?: Type;
}

export type ExpertiseRestConfig = [value: string, parameters?: ExpertiseParameters, options?: Options];

export type ExpertiseConfig = ExpertiseProperty | ExpertiseRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify a field of expertise for the object to which the
 * >           vCard refers.
 * >
 * > Value type:  A single text value.
 * >
 * > Description: This is intended to be a free-form naming of fields of
 * >              expertise, meant for human consumption, and no specific
 * >              expertise fields are defined. See the note at the
 * >              beginning of Section 2.
 * >
 * > Format definition:
 * >   EXPERTISE-param = LEVEL-param / INDEX-param / language-param /
 * >                     pref-param / altid-param / type-param /
 * >                     any-param
 * >
 * >   EXPERTISE-value = text
 * >
 * > Examples:
 * >   EXPERTISE;LEVEL=beginner;INDEX=2:chinese literature
 * >   EXPERTISE;INDEX=1;LEVEL=expert:chemistry
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6715/#section-2.1 RFC 6715 - vCard Format Extensions: Representing vCard Extensions Defined by the Open Mobile Alliance (OMA) Converged Address Book (CAB) Group § Property: EXPERTISE}
 */
export default class ExpertiseProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: ExpertiseParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: ExpertiseParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        ExpertiseProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: ExpertiseConfig): ExpertiseProperty {
        if (value instanceof ExpertiseProperty) return value;

        if (Array.isArray(value)) return new ExpertiseProperty(...value);

        if (isString(value)) return new ExpertiseProperty(value);

        throw new TypeError(`The value "${value}" is not a ExpertiseConfig type`);
    }

    static validateParameters({ index, pref }: ExpertiseParameters): void {
        if (index && !isValidIndexParameter(index)) {
            throw new TypeError(getInvalidIndexParameterMessage({ index }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
