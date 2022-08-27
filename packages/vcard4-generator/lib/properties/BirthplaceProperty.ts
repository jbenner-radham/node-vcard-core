import type { Cardinality, Group, PropertyOptions, Value } from '../types';
import isString from '../util/is-string';
import isValidGroup from '../util/is-valid-group';
import Property from './Property';

export interface BirthplaceParameters {
    value?: 'text' | 'uri';
    altid?: number | string;
    language?: string;
}

export type BirthplacePropertyRestConfig = [
    value: string,
    parameters?: BirthplaceParameters,
    options?: PropertyOptions
];

export type BirthplacePropertyLike = BirthplaceProperty | BirthplacePropertyRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the place of birth of the object the vCard
 * >           represents.
 * >
 * > Value type:  A single text value (default) or a single URI value.
 * >
 * > Format definition:
 * >   BIRTHPLACE-param = "VALUE=" ("text" / "uri")
 * >   BIRTHPLACE-value = text / uri
 * >      ; Value type and VALUE parameter MUST match.
 * >
 * >   BIRTHPLACE-param =/ altid-param / language-param / any-param
 * >
 * > Examples:
 * >   BIRTHPLACE:Babies'R'Us Hospital
 * >   BIRTHPLACE;VALUE=uri:http://example.com/hospitals/babiesrus.vcf
 * >   BIRTHPLACE;VALUE=uri:geo:46.769307,-71.283079
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6474/#section-2.1
 */
export default class BirthplaceProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: BirthplaceParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: BirthplaceParameters = {}, { group = '' }: PropertyOptions = {}) {
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

    static factory(value: BirthplacePropertyLike): BirthplaceProperty {
        if (value instanceof BirthplaceProperty) return value;

        if (Array.isArray(value)) return new BirthplaceProperty(...value);

        if (isString(value)) return new BirthplaceProperty(value);

        throw new TypeError(`The value "${value}" is not a BirthplacePropertyLike type`);
    }
}
