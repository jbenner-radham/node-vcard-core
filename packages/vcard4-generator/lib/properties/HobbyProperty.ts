import type { Cardinality, Group, HobbyOrInterestLevel, PropertyOptions, Type, Value } from '../types';
import { getInvalidIndexParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidGroup from '../util/is-valid-group';
import isValidIndexParameter from '../util/is-valid-index-parameter';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export type HobbyLevel = HobbyOrInterestLevel;

export interface HobbyParameters {
    level?: HobbyLevel;
    index?: number; // > INDEX values must be strictly positive. Zero is not allowed. _(integer)_
    altid?: number | string;
    language?: string;
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
}

export type HobbyPropertyRestConfig = [value: string, parameters?: HobbyParameters, options?: PropertyOptions];

export type HobbyPropertyLike = HobbyProperty | HobbyPropertyRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the hobbies of the object to which the vCard
 * >           refers.
 * >
 * > Value type:  A single text value.
 * >
 * > Description: This is intended to be a free-form naming of hobbies,
 * >              meant for human consumption, and no specific hobbies
 * >              are defined. See the note at the beginning of
 * >              Section 2.
 * >
 * >              A hobby, as opposed to an interest (see Section 2.3),
 * >              is an activity that one actively engages in for
 * >              entertainment, intellectual stimulation, creative
 * >              expression, or the like.
 * >
 * >    * "Art" might be a hobby if one actively sculpts or paints.
 * >
 * >    * "Tennis" might be a hobby if one enjoys playing, rather than
 * >      just watching, matches.
 * >
 * > Format definition:
 * >   HOBBY-param = LEVEL-param / INDEX-param / language-param /
 * >                 pref-param / altid-param / type-param / any-param
 * >
 * >   HOBBY-value = text
 * >
 * > Examples:
 * >   HOBBY;INDEX=1;LEVEL=high:reading
 * >   HOBBY;INDEX=2;LEVEL=high:sewing
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6715#section-2.2
 */
export default class HobbyProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: HobbyParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: HobbyParameters = {}, { group = '' }: PropertyOptions = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: HobbyPropertyLike): HobbyProperty {
        if (value instanceof HobbyProperty) return value;

        if (Array.isArray(value)) return new HobbyProperty(...value);

        if (isString(value)) return new HobbyProperty(value);

        throw new TypeError(`The value "${value}" is not a HobbyPropertyLike type`);
    }

    static validateParameters({ index, pref }: HobbyParameters): void {
        if (index && !isValidIndexParameter(index)) {
            throw new TypeError(getInvalidIndexParameterMessage({ index }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
