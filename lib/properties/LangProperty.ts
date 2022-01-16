import isPlainObject from 'lodash.isplainobject';
import { Cardinality, Type, Value } from '../types';
import foldLine from '../util/fold-line';
import isString from '../util/is-string';
import Property from './Property';

export interface LangParameters {
    value?: 'language-tag';
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    altid?: number | string;
    type?: Type;
}

export interface LangPropertyConfig {
    value: string;
    parameters?: LangParameters;
}

export type LangPropertyLike = LangProperty | LangPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the language(s) that may be used for contacting
 * >   the entity associated with the vCard.
 * >
 * > Value type:  A single language-tag value.
 * >
 * > ABNF:
 * >   LANG-param = "VALUE=language-tag" / pid-param / pref-param
 * >              / altid-param / type-param / any-param
 * >   LANG-value = Language-Tag
 * >
 * > Example:
 * >   LANG;TYPE=work;PREF=1:en
 * >   LANG;TYPE=work;PREF=2:fr
 * >   LANG;TYPE=home:fr
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.4.4
 */
export default class LangProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'language-tag';

    parameters: LangParameters = {};

    [VALUE]: string;

    #objectConstructor(config: LangPropertyConfig) {
        const { value, parameters = {} } = config;
        this.parameters = parameters;
        this[VALUE] = value;

        return this;
    }

    #stringConstructor(value: string) {
        this[VALUE] = value;

        return this;
    }

    constructor(config: LangPropertyConfig | string) {
        super();


        if (isPlainObject(config)) {
            return this.#objectConstructor(config as LangPropertyConfig);
        }

        if (isString(config)) {
            return this.#stringConstructor(config);
        }

        throw new TypeError(`The value "${config}" is not a LangPropertyConfig or string type`);
    }

    toString() {
        return foldLine(`LANG${this.getParametersString()}:${this.valueOf()}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: LangPropertyLike): LangProperty {
        if (value instanceof LangProperty) return value;

        if (isPlainObject(value) || isString(value)) return new LangProperty(value);

        throw new TypeError(`The value "${value}" is not a LangPropertyLike type`);
    }
}
