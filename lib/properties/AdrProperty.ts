import { Cardinality, Type, Value } from '../types';
import getSemicolonCount from '../util/get-semicolon-count';
import { getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export interface AdrParameters {
    value?: 'text';
    label?: string;
    language?: string;
    geo?: string;
    tz?: string;
    altid?: string;
    pid?: string;
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
}

export type AdrPropertyConfig = [value: string, parameters?: AdrParameters];

export type AdrPropertyLike = AdrProperty | AdrPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the components of the delivery address for the
 * >   vCard object.
 * >
 * > Value type:  A single structured text value, separated by the
 * >   SEMICOLON character (U+003B).
 * >
 * > Special notes:  The structured type value consists of a sequence of
 * >   address components. The component values MUST be specified in
 * >   their corresponding position. The structured type value
 * >   corresponds, in sequence, to
 * >     the post office box;
 * >     the extended address (e.g., apartment or suite number);
 * >     the street address;
 * >     the locality (e.g., city);
 * >     the region (e.g., state or province);
 * >     the postal code;
 * >     the country name (full name in the language specified in
 * >     Section 5.1).
 * >
 * >   When a component value is missing, the associated component
 * >   separator MUST still be specified.
 * >
 * >   Experience with vCard 3 has shown that the first two components
 * >   (post office box and extended address) are plagued with many
 * >   interoperability issues. To ensure maximal interoperability,
 * >   their values SHOULD be empty.
 * >
 * >   The text components are separated by the SEMICOLON character
 * >   (U+003B).  Where it makes semantic sense, individual text
 * >   components can include multiple text values (e.g., a "street"
 * >   component with multiple lines) separated by the COMMA character
 * >   (U+002C).
 * >
 * >   The property can include the "PREF" parameter to indicate the
 * >   preferred delivery address when more than one address is
 * >   specified.
 * >
 * >   The GEO and TZ parameters MAY be used with this property.
 * >
 * >   The property can also include a "LABEL" parameter to present a
 * >   delivery address label for the address. Its value is a plain-text
 * >   string representing the formatted address. Newlines are encoded
 * >   as \n, as they are for property values.
 * >
 * > ABNF:
 * >   label-param = "LABEL=" param-value
 * >
 * >   ADR-param = "VALUE=text" / label-param / language-param
 * >             / geo-parameter / tz-parameter / altid-param / pid-param
 * >             / pref-param / type-param / any-param
 * >   ADR-value = ADR-component-pobox ";" ADR-component-ext ";"
 * >               ADR-component-street ";" ADR-component-locality ";"
 * >               ADR-component-region ";" ADR-component-code ";"
 * >               ADR-component-country
 * >   ADR-component-pobox    = list-component
 * >   ADR-component-ext      = list-component
 * >   ADR-component-street   = list-component
 * >   ADR-component-locality = list-component
 * >   ADR-component-region   = list-component
 * >   ADR-component-code     = list-component
 * >   ADR-component-country  = list-component
 * >
 * > Example: In this example, the post office box and the extended
 * >   address are absent.
 * >
 * >   ADR;GEO="geo:12.3457,78.910";LABEL="Mr. John Q. Public, Esq.\n
 * >    Mail Drop: TNE QB\n123 Main Street\nAny Town, CA  91921-1234\n
 * >    U.S.A.":;;123 Main Street;Any Town;CA;91921-1234;U.S.A.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.3.1
 */
export default class AdrProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    parameters: AdrParameters = {};

    [VALUE]: string;

    get postOfficeBox(): string {
        const [postOfficeBox = ''] = this.components();

        return postOfficeBox;
    }

    get extendedAddress(): string {
        const [, extendedAddress = ''] = this.components();

        return extendedAddress;
    }

    get streetAddress(): string {
        const [, , streetAddress = ''] = this.components();

        return streetAddress;
    }

    get locality(): string {
        const [, , , locality = ''] = this.components();

        return locality;
    }

    get region(): string {
        const [, , , , region = ''] = this.components();

        return region;
    }

    get postalCode(): string {
        const [, , , , , postalCode = ''] = this.components();

        return postalCode;
    }

    get countryName(): string {
        const [, , , , , , countryName = ''] = this.components();

        return countryName;
    }

    constructor(value: string, parameters: AdrParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        this.validate(value);
        AdrProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    validate(value: string): void {
        const semicolonCount = getSemicolonCount(value);

        if (semicolonCount !== 6)
            throw new TypeError(`The value "${value}" is not a valid ADR format`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: AdrPropertyLike): AdrProperty {
        if (value instanceof AdrProperty) return value;

        if (Array.isArray(value)) return new AdrProperty(...value);

        if (isString(value)) return new AdrProperty(value);

        throw new TypeError(`The value "${value}" is not a AdrPropertyLike type`);
    }

    static validateParameters({ pref }: AdrParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
