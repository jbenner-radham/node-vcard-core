import type { Altid, Cardinality, Group, Options, Value } from '../types.js';
import getUnescapedSemicolonCount from '../util/get-unescaped-semicolon-count.js';
import isValidGroup from '../util/is-valid-group.js';
import Property from './Property.js';
import isString from '../util/is-string.js';

export interface NParameters {
    value?: Extract<Value, 'text'>;
    sortAs?: string;
    language?: string;
    altid?: Altid;
}

export type NRestConfig = [value: string, parameters?: NParameters, options?: Options];

export type NConfig = NProperty | NRestConfig | string;

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
 * --------------------------------------------------------------------
 *
 * > This specification modifies the definition of the N property. It
 * > extends its structured value with additional name components to
 * > better support international names and generation markers. In doing
 * > so, this also facilitates formatting N property values using the
 * > Unicode Common Locale Data Repository (CLDR) Person Name
 * > [CLDRPersonName] formatting standard.
 * >
 * > One new component is for secondary surnames, because in some
 * > cultures, such secondary surname kinds are used to indicate the
 * > paternal and maternal family names or generational names indicating
 * > father or grandfather. Another new component indicates a generation
 * > ("II", "XVI") or parental relation ("Jr.", "Sr.").
 * >
 * > Currently, implementations typically place secondary surnames in the
 * > family name component and generational markers in the honorific
 * > suffixes component. For backwards compatibility, implementations
 * > SHOULD add such values to both the newly defined components and their
 * > backwards-compatible counterpart. Reading N property values,
 * > implementations SHOULD ignore any value in the backwards-compatible
 * > component if an equal value is set in the new component accordingly.
 * > For example, a "Jr." that occurs in both honorific suffixes and
 * > generation should only be handled as a generational marker.
 * >
 * > The following change is made to the first paragraph under "Special
 * > note", as originally specified in Section 6.2.2 of [RFC6350]. The
 * > remaining paragraphs of that section in the original specification
 * > still apply.
 * >
 * > Special note: The structured property value corresponds, in sequence,
 * > to the
 * >
 * >    family names (also known as surnames);
 * >    given names;
 * >    additional names;
 * >    honorific prefixes;
 * >    honorific suffixes;
 * >    secondary surname; and
 * >    generation.
 * >
 * > The following change is made under "ABNF", as originally specified in
 * > Section 6.2.2 of [RFC6350].
 * >
 * > ABNF
 * >
 * > N-param = "VALUE=text" / sort-as-param / language-param
 * >              / altid-param / any-param
 * > N-value = list-component 6(";" list-component)
 * >
 * > The following change is made under "Examples", as originally
 * > specified in Section 6.2.2 of [RFC6350].
 * >
 * > Examples
 * >
 * > N:Public;John;Quinlan;Mr.;Esq.
 * >
 * > N:Stevenson;John;Philip,Paul;Dr.;Jr.,M.D.,A.C.P.;;Jr.
 * >
 * > No change is required for the definition of the SORT-AS parameter,
 * > but the new components also apply for use with this parameter.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.2 RFC 6350 - vCard Format Specification § N}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc9554/#section-2.2 RFC 9554 - vCard Format Extensions for JSContact § N}
 */
export default class NProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    static readonly RFC6350_SEMICOLON_COUNT = 4;

    static readonly RFC9554_SEMICOLON_COUNT = 6;

    group: Group;

    parameters: NParameters = {};

    [VALUE]: string;

    /**
     * a.k.a. "last name", "surname"
     */
    get familyName(): string {
        return this.components().at(0) ?? '';
    }

    /**
     * a.k.a. "first name", "personal name"
     */
    get givenName(): string {
        return this.components().at(1) ?? '';
    }

    /**
     * a.k.a. "middle name", "patronymic name", "nasab", "a series of patronymics"
     */
    get additionalName(): string {
        return this.components().at(2) ?? '';
    }

    /**
     * e.g., "Mr.", "Ms.", "Dr."
     */
    get honorificPrefix(): string {
        return this.components().at(3) ?? '';
    }

    /**
     * e.g., "B.A.", "Esq."
     */
    get honorificSuffix(): string {
        return this.components().at(4) ?? '';
    }

    /**
     * a.k.a. "maternal surname", "paternal surname", "generational name"
     */
    get secondarySurname(): string {
        return this.components().at(5) ?? '';
    }

    /**
     * e.g., "II", "XVI", "Jr.", "Sr."
     */
    get generation(): string {
        return this.components().at(6) ?? '';
    }

    constructor(value: string, parameters: NParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        this.validate(value);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    validate(value: string): void {
        const semicolonCount = getUnescapedSemicolonCount(value);

        if (
            semicolonCount !== NProperty.RFC6350_SEMICOLON_COUNT &&
            semicolonCount !== NProperty.RFC9554_SEMICOLON_COUNT
        ) {
            throw new TypeError(`The value "${value}" is not a valid N format`);
        }
    }

    static from(value: NConfig): NProperty {
        if (value instanceof NProperty) return value;

        if (Array.isArray(value)) return new NProperty(...value);

        if (isString(value)) return new NProperty(value);

        throw new TypeError(`The value "${value}" is not a NConfig type`);
    }
}
