import { Cardinality, Value } from '../types';
import foldLine from '../util/fold-line';
import isString from '../util/is-string';
import Property from './Property';

export interface BirthplaceParameters {
    value?: 'text' | 'uri';
    altid?: number | string;
    language?: string;
}

export type BirthplacePropertyConfig = [value: string, parameters?: BirthplaceParameters];

export type BirthplacePropertyLike = BirthplaceProperty | BirthplacePropertyConfig | string;

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

    parameters: BirthplaceParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: BirthplaceParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    toString() {
        const parameters = this.getParametersString();
        const value = this.parameters.value?.toLowerCase() === 'uri'
            ? this.valueOf()
            : this.getEscapedValueString();

        return foldLine(`BIRTHPLACE${parameters}:${value}`);
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
