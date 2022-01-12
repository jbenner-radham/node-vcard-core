import isPlainObject from 'lodash.isplainobject';
import { Cardinality, Type } from '../types';
import foldLine from '../util/fold-line';
import isString from '../util/is-string';
import Property from './Property';

export interface FnParameters {
    type?: Type;
    language?: string;
    altid?: string;
    pid?: string;
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
}

export interface FnPropertyConfig {
    value: string;
    parameters?: FnParameters;
}

export type FnPropertyLike = FnProperty | FnPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the formatted text corresponding to the name of
 * >   the object the vCard represents.
 * >
 * > Value type:  A single text value.
 * >
 * > Special notes:  This property is based on the semantics of the X.520
 * >   Common Name attribute [CCITT.X520.1988]. The property MUST be
 * >   present in the vCard object.
 * >
 * > ABNF:
 * >   FN-param = "VALUE=text" / type-param / language-param / altid-param
 * >            / pid-param / pref-param / any-param
 * >   FN-value = text
 * >
 * > Example:
 * >   FN:Mr. John Q. Public\, Esq.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.1
 */
export default class FnProperty extends Property {
    static readonly CARDINALITY: Cardinality = '1*'; // One or more instances per vCard MUST be present.

    parameters: FnParameters;

    [VALUE]: string;

    constructor(config: FnPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as FnPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (isString(config)) {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a FnPropertyConfig or string type`);
    }

    toString() {
        const value = this.hasParameters
            ? this.getValueWithParameters()
            : this.getValue();

        return foldLine(`FN${value}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: FnPropertyLike): FnProperty {
        if (value instanceof FnProperty) return value;

        if (isPlainObject(value) || isString(value)) return new FnProperty(value);

        throw new TypeError(`The value "${value}" is not a FnPropertyLike type`);
    }
}
