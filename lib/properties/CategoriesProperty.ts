import isPlainObject from 'lodash.isplainobject';
import { Cardinality } from '../types';
import Property from './Property';

export interface CategoriesParameters {
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: 'home' | 'work' | string;
    altid?: number | string;
}

export interface CategoriesPropertyConfig {
    value: string;
    parameters?: CategoriesParameters;
}

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

    [VALUE]: string;

    constructor(config: CategoriesPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as CategoriesPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (typeof config === 'string') {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a CategoriesPropertyConfig or string type`);
    }

    toString() {
        const value = this.hasParameters
            ? this.getValueWithParameters()
            : this.getValue();

        return `CATEGORIES${value}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: CategoriesPropertyLike): CategoriesProperty {
        if (value instanceof CategoriesProperty) return value;

        if (typeof value === 'string') return new CategoriesProperty(value);

        throw new TypeError(`The value "${value}" is not a CategoriesPropertyLike type`);
    }
}
