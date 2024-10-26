import type { Cardinality, Group, PropertyOptions, Value } from '../types.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import Property from './Property.js';

export type Kind = 'application' | 'group' | 'individual' | 'location' | 'org';

export interface KindParameters {
    value?: 'text';
}

export type KindPropertyRestConfig = [value: Kind, parameters?: KindParameters, options?: PropertyOptions];

export type KindPropertyLike = KindProperty | KindPropertyRestConfig | Kind;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the kind of object the vCard represents.
 * >
 * > Value type:  A single text value.
 * >
 * > Special notes:  The value may be one of the following:
 * >
 * >   "individual"  for a vCard representing a single person or entity.
 * >     This is the default kind of vCard.
 * >
 * >   "group"  for a vCard representing a group of persons or entities.
 * >     The group's member entities can be other vCards or other types
 * >     of entities, such as email addresses or web sites. A group
 * >     vCard will usually contain MEMBER properties to specify the
 * >     members of the group, but it is not required to. A group vCard
 * >     without MEMBER properties can be considered an abstract
 * >     grouping, or one whose members are known empirically (perhaps
 * >     "IETF Participants" or "Republican U.S. Senators").
 * >
 * >     All properties in a group vCard apply to the group as a whole,
 * >     and not to any particular MEMBER. For example, an EMAIL
 * >     property might specify the address of a mailing list associated
 * >     with the group, and an IMPP property might refer to a group
 * >     chat room.
 * >
 * >   "org"  for a vCard representing an organization. An organization
 * >     vCard will not (in fact, MUST NOT) contain MEMBER properties,
 * >     and so these are something of a cross between "individual" and
 * >     "group". An organization is a single entity, but not a person.
 * >     It might represent a business or government, a department or
 * >     division within a business or government, a club, an
 * >     association, or the like.
 * >
 * >     All properties in an organization vCard apply to the
 * >     organization as a whole, as is the case with a group vCard.
 * >     For example, an EMAIL property might specify the address of a
 * >     contact point for the organization.
 * >
 * >   "location"  for a named geographical place. A location vCard will
 * >     usually contain a GEO property, but it is not required to. A
 * >     location vCard without a GEO property can be considered an
 * >     abstract location, or one whose definition is known empirically
 * >     (perhaps "New England" or "The Seashore").
 * >
 * >     All properties in a location vCard apply to the location
 * >     itself, and not with any entity that might exist at that
 * >     location. For example, in a vCard for an office building, an
 * >     ADR property might give the mailing address for the building,
 * >     and a TEL property might specify the telephone number of the
 * >     receptionist.
 * >
 * >   An x-name.  vCards MAY include private or experimental values for
 * >     KIND. Remember that x-name values are not intended for general
 * >     use and are unlikely to interoperate.
 * >
 * >   An iana-token.  Additional values may be registered with IANA (see
 * >     Section 10.3.4).  A new value's specification document MUST
 * >     specify which properties make sense for that new kind of vCard
 * >     and which do not.
 * >
 * >   Implementations MUST support the specific string values defined
 * >   above. If this property is absent, "individual" MUST be assumed
 * >   as the default. If this property is present but the
 * >   implementation does not understand its value (the value is an
 * >   x-name or iana-token that the implementation does not support),
 * >   the implementation SHOULD act in a neutral way, which usually
 * >   means treating the vCard as though its kind were "individual".
 * >   The presence of MEMBER properties MAY, however, be taken as an
 * >   indication that the unknown kind is an extension of "group".
 * >
 * >   Clients often need to visually distinguish contacts based on what
 * >   they represent, and the KIND property provides a direct way for
 * >   them to do so. For example, when displaying contacts in a list,
 * >   an icon could be displayed next to each one, using distinctive
 * >   icons for the different kinds; a client might use an outline of a
 * >   single person to represent an "individual", an outline of multiple
 * >   people to represent a "group", and so on. Alternatively, or in
 * >   addition, a client might choose to segregate different kinds of
 * >   vCards to different panes, tabs, or selections in the user
 * >   interface.
 * >
 * >   Some clients might also make functional distinctions among the
 * >   kinds, ignoring "location" vCards for some purposes and
 * >   considering only "location" vCards for others.
 * >
 * >   When designing those sorts of visual and functional distinctions,
 * >   client implementations have to decide how to fit unsupported kinds
 * >   into the scheme. What icon is used for them?  The one for
 * >   "individual"? A unique one, such as an icon of a question mark?
 * >   Which tab do they go into? It is beyond the scope of this
 * >   specification to answer these questions, but these are things
 * >   implementers need to consider.
 * >
 * > ABNF:
 * >   KIND-param = "VALUE=text" / any-param
 * >   KIND-value = "individual" / "group" / "org" / "location"
 * >              / iana-token / x-name
 * >
 * > Example:
 * >
 * >   This represents someone named Jane Doe working in the marketing
 * >   department of the North American division of ABC Inc.
 * >
 * >     BEGIN:VCARD
 * >     VERSION:4.0
 * >     KIND:individual
 * >     FN:Jane Doe
 * >     ORG:ABC\, Inc.;North American Division;Marketing
 * >     END:VCARD
 * >
 * >   This represents the department itself, commonly known as ABC
 * >   Marketing.
 * >
 * >     BEGIN:VCARD
 * >     VERSION:4.0
 * >     KIND:org
 * >     FN:ABC Marketing
 * >     ORG:ABC\, Inc.;North American Division;Marketing
 * >     END:VCARD
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.1.4 RFC 6350 - vCard Format Specification § KIND}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6473 RFC 6473 - vCard KIND:application}
 */
export default class KindProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: KindParameters = {};

    [VALUE]: string;

    constructor(value: Kind, parameters: KindParameters = {}, { group = '' }: PropertyOptions = {}) {
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

    static factory(value: KindPropertyLike): KindProperty {
        if (value instanceof KindProperty) return value;

        if (Array.isArray(value)) return new KindProperty(...value);

        if (isString(value)) return new KindProperty(value);

        throw new TypeError(`The value "${value}" is not a KindPropertyLike type`);
    }
}
