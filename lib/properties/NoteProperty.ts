import isPlainObject from 'lodash.isplainobject';
import isString from '../util/is-string';
import { Cardinality, Type } from '../types';
import Property from './Property';

export interface NoteParameters {
    language?: string;
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
    altid?: number | string;
}

export interface NotePropertyConfig {
    value: string;
    parameters?: NoteParameters;
}

export type NotePropertyLike = NoteProperty | NotePropertyConfig | string;

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
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.2
 */
export default class NoteProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(config: NotePropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as NotePropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (isString(config)) {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a NotePropertyConfig or string type`);
    }

    toString() {
        return `NOTE${this.getParametersString()}:${this.getEscapedValueString()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: NotePropertyLike): NoteProperty {
        if (value instanceof NoteProperty) return value;

        if (isPlainObject(value) || isString(value)) return new NoteProperty(value);

        throw new TypeError(`The value "${value}" is not a NotePropertyLike type`);
    }
}
