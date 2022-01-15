import isPlainObject from 'lodash.isplainobject';
import { Cardinality, Type, Value } from '../types';
import foldLine from '../util/fold-line';
import isString from '../util/is-string';
import Property from './Property';

export interface NicknameParameters {
    value?: 'text';
    type?: Type;
    language?: string;
    altid?: number | string;
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
}

export interface NicknamePropertyConfig {
    value: string;
    parameters?: NicknameParameters;
}

export type NicknamePropertyLike = NicknameProperty | NicknamePropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the text corresponding to the nickname of the object the vCard represents.
 * >
 * > Value type:  One or more text values separated by a COMMA character (U+002C).
 * >
 * > Special note:  The nickname is the descriptive name given instead of or in addition to the one
 * >   belonging to the object the vCard represents. It can also be used to specify a familiar form
 * >   of a proper name specified by the FN or N properties.
 * >
 * > ABNF:
 * >   NICKNAME-param = "VALUE=text" / type-param / language-param
 * >                  / altid-param / pid-param / pref-param / any-param
 * >   NICKNAME-value = text-list
 * >
 * > Examples:
 * >   NICKNAME:Robbie
 * >   NICKNAME:Jim,Jimmie
 * >   NICKNAME;TYPE=work:Boss
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.3
 */
export default class NicknameProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    parameters: NicknameParameters = {};

    [VALUE]: string;

    #objectConstructor(config: NicknamePropertyConfig) {
        const { value, parameters = {} } = config;
        this.parameters = parameters;
        this[VALUE] = value;

        return this;
    }

    #stringConstructor(value: string) {
        this[VALUE] = value;

        return this;
    }

    constructor(config: NicknamePropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            return this.#objectConstructor(config as NicknamePropertyConfig);
        }

        if (isString(config)) {
            return this.#stringConstructor(config);
        }

        throw new TypeError(`The value "${config}" is not a NicknamePropertyConfig or string type`);
    }

    toString() {
        const parameters = this.getParametersString();
        const value = this.getEscapedValueString();

        return foldLine(`NICKNAME${parameters}:${value}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: NicknamePropertyLike): NicknameProperty {
        if (value instanceof NicknameProperty) return value;

        if (isPlainObject(value) || isString(value)) return new NicknameProperty(value);

        throw new TypeError(`The value "${value}" is not a NicknamePropertyLike type`);
    }
}
