import type { Cardinality, Group, Options, Value } from '../types.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import Property from './Property.js';

export interface ProdidParameters {
    value?: 'text';
}

export type ProdidRestConfig = [value: string, parameters?: ProdidParameters, options?: Options];

export type ProdidConfig = ProdidProperty | ProdidRestConfig | string;

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
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.3 RFC 6350 - vCard Format Specification § PRODID}
 */
export default class ProdidProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: ProdidParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: ProdidParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: ProdidConfig): ProdidProperty {
        if (value instanceof ProdidProperty) return value;

        if (Array.isArray(value)) return new ProdidProperty(...value);

        if (isString(value)) return new ProdidProperty(value);

        throw new TypeError(`The value "${value}" is not a ProdidConfig type`);
    }
}
