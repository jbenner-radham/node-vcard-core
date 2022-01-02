import isPlainObject from 'lodash.isplainobject';
import { Cardinality } from '../types';
import Property from './Property';

export interface ProdidParameters {
    [key: string]: never;
}

export interface ProdidPropertyConfig {
    value: string;
    parameters?: ProdidParameters;
}

export type ProdidPropertyLike = ProdidProperty | ProdidPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the identifier for the product that created the
 * >   vCard object.
 * >
 * > Value type:  A single text value.
 * >
 * > Special notes:  Implementations SHOULD use a method such as that
 * >   specified for Formal Public Identifiers in [ISO9070] or for
 * >   Universal Resource Names in [RFC3406] to ensure that the text
 * >   value is unique.
 * >
 * > ABNF:
 * >   PRODID-param = "VALUE=text" / any-param
 * >   PRODID-value = text
 * >
 * > Example:
 * >   PRODID:-//ONLINE DIRECTORY//NONSGML Version 1//EN
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.3
 */
export default class ProdidProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    [VALUE]: string;

    constructor(config: ProdidPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value } = config as ProdidPropertyConfig;
            this[VALUE] = value;

            return;
        }

        if (typeof config === 'string') {
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a ProdidPropertyConfig or string type`);
    }

    toString() {
        return `PRODID:${this.getEscapedValueString()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: ProdidPropertyLike): ProdidProperty {
        if (value instanceof ProdidProperty) return value;

        if (typeof value === 'string') return new ProdidProperty(value);

        throw new TypeError(`The value "${value}" is not a ProdidPropertyLike type`);
    }
}
