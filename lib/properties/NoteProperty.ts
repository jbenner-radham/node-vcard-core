import isPlainObject from 'lodash.isplainobject';
import { Cardinality, Type, Value } from '../types';
import foldLine from '../util/fold-line';
import { getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export interface NoteParameters {
    value?: 'text';
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

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    parameters: NoteParameters = {};

    [VALUE]: string;

    #objectConstructor(config: NotePropertyConfig) {
        const { value, parameters = {} } = config;

        NoteProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;

        return this;
    }

    #stringConstructor(value: string) {
        this[VALUE] = value;

        return this;
    }

    constructor(config: NotePropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            return this.#objectConstructor(config as NotePropertyConfig);
        }

        if (isString(config)) {
            return this.#stringConstructor(config);
        }

        throw new TypeError(`The value "${config}" is not a NotePropertyConfig or string type`);
    }

    toString() {
        const parameters = this.getParametersString();
        const value = this.getEscapedValueString();

        return foldLine(`NOTE${parameters}:${value}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: NotePropertyLike): NoteProperty {
        if (value instanceof NoteProperty) return value;

        if (isPlainObject(value) || isString(value)) return new NoteProperty(value);

        throw new TypeError(`The value "${value}" is not a NotePropertyLike type`);
    }

    static validateParameters({ pref }: NoteParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
