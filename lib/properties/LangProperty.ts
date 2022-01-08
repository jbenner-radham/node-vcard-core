import isPlainObject from 'lodash.isplainobject';
import isString from '../util/is-string';
import { Cardinality, Type } from '../types';
import Property from './Property';

export interface LangParameters {
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

    [VALUE]: string;

    constructor(config: LangPropertyConfig | string) {
        super();


        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as LangPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (isString(config)) {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a LangPropertyConfig or string type`);
    }

    toString() {
        return `LANG${this.getParametersString()}:${this.valueOf()}`;
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
