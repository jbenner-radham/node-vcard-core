import { Cardinality, Value } from '../types';
import getUnescapedSemicolonCount from '../util/get-unescaped-semicolon-count';
import Property from './Property';
import isString from '../util/is-string';

export interface NParameters {
    value?: 'text';
    sortAs?: string;
    language?: string;
    altid?: number | string;
}

export type NPropertyRestConfig = [value: string, parameters?: NParameters];

export type NPropertyLike = NProperty | NPropertyRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the components of the name of the object the
 * >   vCard represents.
 * >
 * > Value type:  A single structured text value. Each component can have
 * >   multiple values.
 * >
 * > Special note:  The structured property value corresponds, in
 * >   sequence, to the Family Names (also known as surnames), Given
 * >   Names, Additional Names, Honorific Prefixes, and Honorific
 * >   Suffixes. The text components are separated by the SEMICOLON
 * >   character (U+003B). Individual text components can include
 * >   multiple text values separated by the COMMA character (U+002C).
 * >   This property is based on the semantics of the X.520 individual
 * >   name attributes [CCITT.X520.1988]. The property SHOULD be present
 * >   in the vCard object when the name of the object the vCard
 * >   represents follows the X.520 model.
 * >
 * >   The SORT-AS parameter MAY be applied to this property.
 * >
 * > ABNF:
 * >   N-param = "VALUE=text" / sort-as-param / language-param
 * >           / altid-param / any-param
 * >   N-value = list-component 4(";" list-component)
 * >
 * > Examples:
 * >   N:Public;John;Quinlan;Mr.;Esq.
 * >
 * >   N:Stevenson;John;Philip,Paul;Dr.;Jr.,M.D.,A.C.P.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.2
 */
export default class NProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    parameters: NParameters = {};

    [VALUE]: string;

    get familyName(): string {
        const [familyName = ''] = this.components();

        return familyName;
    }

    get givenName(): string {
        const [, givenName = ''] = this.components();

        return givenName;
    }

    get additionalName(): string {
        const [, , additionalName = ''] = this.components();

        return additionalName;
    }

    get honorificPrefix(): string {
        const [, , , honorificPrefix = ''] = this.components();

        return honorificPrefix;
    }

    get honorificSuffix(): string {
        const [, , , , honorificSuffix = ''] = this.components();

        return honorificSuffix;
    }

    constructor(value: string, parameters: NParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        this.validate(value);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    validate(value: string): void {
        const semicolonCount = getUnescapedSemicolonCount(value);

        if (semicolonCount !== 4)
            throw new TypeError(`The value "${value}" is not a valid N format`);
    }

    static factory(value: NPropertyLike): NProperty {
        if (value instanceof NProperty) return value;

        if (Array.isArray(value)) return new NProperty(...value);

        if (isString(value)) return new NProperty(value);

        throw new TypeError(`The value "${value}" is not a NPropertyLike type`);
    }
}
