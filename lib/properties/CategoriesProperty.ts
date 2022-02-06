import { Cardinality, Type, Value } from '../types';
import foldLine from '../util/fold-line';
import { getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export interface CategoriesParameters {
    value?: 'text';
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
    altid?: number | string;
}

export type CategoriesPropertyConfig = [value: string, parameters?: CategoriesParameters];

/** @todo Add string[] type support. */
export type CategoriesPropertyLike = CategoriesProperty | CategoriesPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify application category information about the
 * >   vCard, also known as "tags".
 * >
 * > Value type:  One or more text values separated by a COMMA character
 * >   (U+002C).
 * >
 * > ABNF:
 * >   CATEGORIES-param = "VALUE=text" / pid-param / pref-param
 * >                    / type-param / altid-param / any-param
 * >   CATEGORIES-value = text-list
 * >
 * > Example _(sic)_:
 * >   CATEGORIES:TRAVEL AGENT
 * >   CATEGORIES:INTERNET,IETF,INDUSTRY,INFORMATION TECHNOLOGY
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.1
 */
export default class CategoriesProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    parameters: CategoriesParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: CategoriesParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        CategoriesProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    toString() {
        const parameters = this.getParametersString();
        const value = this.getEscapedValueString();

        return foldLine(`CATEGORIES${parameters}:${value}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: CategoriesPropertyLike): CategoriesProperty {
        if (value instanceof CategoriesProperty) return value;

        if (Array.isArray(value)) return new CategoriesProperty(...value);

        if (isString(value)) return new CategoriesProperty(value);

        throw new TypeError(`The value "${value}" is not a CategoriesPropertyLike type`);
    }

    static validateParameters({ pref }: CategoriesParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
