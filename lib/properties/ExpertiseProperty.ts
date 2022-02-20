import { Cardinality, Type, Value } from '../types';
import foldLine from '../util/fold-line';
import { getInvalidIndexParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';
import isValidIndexParameter from '../util/is-valid-index-parameter';

export type ExpertiseLevel = 'beginner' | 'average' | 'expert';

export interface ExpertiseParameters {
    altid?: number | string;
    index?: number; // > INDEX values must be strictly positive. Zero is not allowed. _(integer)_
    language?: string;
    level?: ExpertiseLevel;
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
}

export type ExpertisePropertyConfig = [value: string, parameters?: ExpertiseParameters];

export type ExpertisePropertyLike = ExpertiseProperty | ExpertisePropertyConfig | string;

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
 * @see https://datatracker.ietf.org/doc/html/rfc6715/#section-2.1
 */
export default class ExpertiseProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    parameters: ExpertiseParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: ExpertiseParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        ExpertiseProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    toString() {
        const parameters = this.getParametersString();
        const value = this.getEscapedValueString();

        return foldLine(`EXPERTISE${parameters}:${value}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: ExpertisePropertyLike): ExpertiseProperty {
        if (value instanceof ExpertiseProperty) return value;

        if (Array.isArray(value)) return new ExpertiseProperty(...value);

        if (isString(value)) return new ExpertiseProperty(value);

        throw new TypeError(`The value "${value}" is not a ExpertisePropertyLike type`);
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
