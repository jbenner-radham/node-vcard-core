import { Cardinality, HobbyOrInterestLevel, Type, Value } from '../types';
import { getInvalidIndexParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidIndexParameter from '../util/is-valid-index-parameter';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export type InterestLevel = HobbyOrInterestLevel;

export interface InterestParameters {
    altid?: number | string;
    index?: number; // > INDEX values must be strictly positive. Zero is not allowed. _(integer)_
    language?: string;
    level?: InterestLevel;
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
}

export type InterestPropertyRestConfig = [value: string, parameters?: InterestParameters];

export type InterestPropertyLike = InterestProperty | InterestPropertyRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the interest(s) of the object to which the vCard
 * >           refers.
 * >
 * > Value type:  A single text value
 * >
 * > Description:  This is intended to be a free-form naming of interests,
 * >               meant for human consumption, and no specific interests
 * >               are defined. See the note at the beginning of
 * >               Section 2.
 * >
 * >               An interest, as opposed to a hobby (see Section 2.2),
 * >               is an activity or topic that one finds interesting but
 * >               doesn't necessarily actively engage in.
 * >
 * >    * "Art" might be an interest if one likes looking at art but
 * >      doesn't create art.
 * >
 * >    * "Tennis" might be an interest if one enjoys watching matches
 * >      but doesn't play.
 * >
 * > Format definition:
 * >   INTEREST-param = LEVEL-param / INDEX-param / language-param /
 * >                    pref-param / altid-param / type-param /
 * >                    any-param
 * >
 * >   INTEREST-value = text
 * >
 * > Examples:
 * >   INTEREST;INDEX=1;LEVEL=medium:r&b music
 * >   INTEREST;INDEX=2;LEVEL=high:rock 'n' roll music
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6715/#section-2.3
 */
export default class InterestProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    parameters: InterestParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: InterestParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: InterestPropertyLike): InterestProperty {
        if (value instanceof InterestProperty) return value;

        if (Array.isArray(value)) return new InterestProperty(...value);

        if (isString(value)) return new InterestProperty(value);

        throw new TypeError(`The value "${value}" is not a InterestPropertyLike type`);
    }

    static validateParameters({ index, pref }: InterestParameters): void {
        if (index && !isValidIndexParameter(index)) {
            throw new TypeError(getInvalidIndexParameterMessage({ index }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
