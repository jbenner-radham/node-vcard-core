import type { Altid, Cardinality, CommonParameters, Group, Options, Value } from '../types.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import Property from './Property.js';

export type BirthplaceParameters = {
    value?: Extract<Value, 'text' | 'uri'>;
    altid?: Altid;
    language?: string;
} & CommonParameters;

export type BirthplaceRestConfig = [value: string, parameters?: BirthplaceParameters, options?: Options];

export type BirthplaceConfig = BirthplaceProperty | BirthplaceRestConfig | string;

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
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6474/#section-2.1 RFC 6474 - vCard Format Extensions: Place of Birth, Place and Date of Death § BIRTHPLACE}
 */
export default class BirthplaceProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: BirthplaceParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: BirthplaceParameters = {}, { group = '' }: Options = {}) {
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

    static from(value: BirthplaceConfig): BirthplaceProperty {
        if (value instanceof BirthplaceProperty) return value;

        if (Array.isArray(value)) return new BirthplaceProperty(...value);

        if (isString(value)) return new BirthplaceProperty(value);

        throw new TypeError(`The value "${value}" is not a BirthplaceConfig type`);
    }
}
