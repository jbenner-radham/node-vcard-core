import type { Altid, Cardinality, Cc, Group, Pid, Pref, Options, Type, Value } from '../types.js';
import getUnescapedSemicolonCount from '../util/get-unescaped-semicolon-count.js';
import {
    getInvalidCcParameterMessage,
    getInvalidPidParameterMessage,
    getInvalidPrefParameterMessage
} from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidCcParameter from '../util/is-valid-cc-parameter.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPidParameter from '../util/is-valid-pid-parameter.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export interface AdrParameters {
    value?: Extract<Value, 'text'>;
    label?: string;
    language?: string;
    geo?: string;
    tz?: string;
    altid?: Altid;
    pid?: Pid;
    pref?: Pref;
    type?: Type;
    cc?: Cc;
}

export type AdrRestConfig = [value: string, parameters?: AdrParameters, options?: Options];

/** @todo Add ADR object support. */
export type AdrConfig = AdrProperty | AdrRestConfig | string;

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
 * --------------------------------------------------------------------
 *
 * > This specification modifies the definition of the ADR property. It
 * > extends its structured value with additional address components to
 * > better support the variety of international addresses. It separates
 * > the address parts, which currently are typically combined in street
 * > address component values, into distinct components.
 * >
 * > Implementations SHOULD write a combined value of these components in
 * > the street address component for backwards compatibility, but they
 * > SHOULD ignore the street component during reads if the ADR property
 * > value contains any of the new components.
 * >
 * > The following change is made to the first paragraph under "Special
 * > note", as originally specified in Section 6.3.1 of [RFC6350]. The
 * > remaining paragraphs of that section in the original specification
 * > still apply.
 * >
 * > Special note: The structured type value consists of a sequence of
 * > address components. The component values MUST be specified in their
 * > corresponding position. The structured type value corresponds, in
 * > sequence, to the
 * >
 * >    post office box;
 * >    extended address (e.g., apartment or suite number);
 * >    street address;
 * >    locality (e.g., city);
 * >    region (e.g., state or province);
 * >    postal code;
 * >    country name (full name in the language specified in Section 5.1
 * >    of [RFC6350]);
 * >    room, suite number, or identifier;
 * >    apartment number, extension designation, or box number;
 * >    building floor or level;
 * >    street number;
 * >    street name;
 * >    building, tower, or condominium;
 * >    block name or number;
 * >    subdistrict;
 * >    district;
 * >    landmark or another publicly known prominent feature that can
 * >    substitute the street name and number (e.g., "White House" and
 * >    "Taj Mahal"); and
 * >    the cardinal direction or quadrant (e.g., "north").
 * >
 * > The following change is made to the definition of "ADR-value" under
 * > "ABNF", as originally specified in Section 6.3.1 of [RFC6350].
 * >
 * > ABNF
 * >
 * > ADR-value = ; defined in RFC 6350, Section 6.3.1.:
 * >             ADR-component-pobox ";"
 * >             ADR-component-ext ";"
 * >             ADR-component-street ";"
 * >             ADR-component-locality ";"
 * >             ADR-component-region ";"
 * >             ADR-component-code ";"
 * >             ADR-component-country ";"
 * >             ; defined in this document:
 * >             ADR-component-room ";"
 * >             ADR-component-apartment ";"
 * >             ADR-component-floor ";"
 * >             ADR-component-streetnumber ";"
 * >             ADR-component-streetname ";"
 * >             ADR-component-building ";"
 * >             ADR-component-block ";"
 * >             ADR-component-subdistrict ";"
 * >             ADR-component-district ";"
 * >             ADR-component-landmark ";"
 * >             ADR-component-direction
 * >
 * > ADR-component-pobox    = list-component
 * > ADR-component-ext      = list-component
 * > ADR-component-street   = list-component
 * > ADR-component-locality = list-component
 * > ADR-component-region   = list-component
 * > ADR-component-code     = list-component
 * > ADR-component-country  = list-component
 * > ADR-component-room     = list-component
 * > ADR-component-apartment = list-component
 * > ADR-component-floor    = list-component
 * > ADR-component-streetnumber = list-component
 * > ADR-component-streetname = list-component
 * > ADR-component-building = list-component
 * > ADR-component-block    = list-component
 * > ADR-component-subdistrict = list-component
 * > ADR-component-district = list-component
 * > ADR-component-landmark = list-component
 * > ADR-component-direction = list-component
 * >
 * > The following change is made under "Example", as originally specified
 * > in Section 6.3.1 of [RFC6350].
 * >
 * > Example: In this example, the post office box and the extended
 * > address components are absent. The street number and name are both
 * > added as separate components and are combined in the street component
 * > for backwards compatibility.
 * >
 * > ADR;GEO="geo:12.3457,78.910":
 * >   ;;123 Main Street;Any Town;CA;91921-1234;U.S.A
 * >   ;;;;123;Main Street;;;;;;
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.3.1 RFC 6350 - vCard Format Specification § ADR}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc8605/#section-3.1 RFC 8605 - vCard Format Extensions: ICANN Extensions for the Registration Data Access Protocol (RDAP) § Parameter: CC}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc9554/#section-2.1 RFC 9554 - vCard Format Extensions for JSContact § ADR}
 */
export default class AdrProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: AdrParameters = {};

    [VALUE]: string;

    get postOfficeBox(): string {
        return this.components().at(0) ?? '';
    }

    get extendedAddress(): string {
        return this.components().at(1) ?? '';
    }

    get streetAddress(): string {
        return this.components().at(2) ?? '';
    }

    get locality(): string {
        return this.components().at(3) ?? '';
    }

    get region(): string {
        return this.components().at(4) ?? '';
    }

    get postalCode(): string {
        return this.components().at(5) ?? '';
    }

    get countryName(): string {
        return this.components().at(6) ?? '';
    }

    get room(): string {
        return this.components().at(7) ?? '';
    }

    get apartment(): string {
        return this.components().at(8) ?? '';
    }

    get floor(): string {
        return this.components().at(9) ?? '';
    }

    get streetNumber(): string {
        return this.components().at(10) ?? '';
    }

    get streetName(): string {
        return this.components().at(11) ?? '';
    }

    get building(): string {
        return this.components().at(12) ?? '';
    }

    get block(): string {
        return this.components().at(13) ?? '';
    }

    get subdistrict(): string {
        return this.components().at(14) ?? '';
    }

    get district(): string {
        return this.components().at(15) ?? '';
    }

    get landmark(): string {
        return this.components().at(16) ?? '';
    }

    get direction(): string {
        return this.components().at(17) ?? '';
    }

    constructor(value: string, parameters: AdrParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        this.validate(value);
        AdrProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    validate(value: string): void {
        const semicolonCount = getUnescapedSemicolonCount(value);
        const rfc6350SemicolonCount = 6;
        const rfc9554SemicolonCount = 17;

        if (semicolonCount !== rfc6350SemicolonCount && semicolonCount !== rfc9554SemicolonCount)
            throw new TypeError(`The value "${value}" is not a valid ADR format`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: AdrConfig): AdrProperty {
        if (value instanceof AdrProperty) return value;

        if (Array.isArray(value)) return new AdrProperty(...value);

        if (isString(value)) return new AdrProperty(value);

        throw new TypeError(`The value "${value}" is not a AdrConfig type`);
    }

    static validateParameters({ cc, pid, pref }: AdrParameters): void {
        if (cc !== undefined && !isValidCcParameter(cc)) {
            throw new TypeError(getInvalidCcParameterMessage({ cc }));
        }

        if (pid !== undefined && !isValidPidParameter(pid)) {
            throw new TypeError(getInvalidPidParameterMessage({ pid }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
