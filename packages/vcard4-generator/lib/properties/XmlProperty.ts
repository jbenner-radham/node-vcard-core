import type { Cardinality, Group, PropertyOptions, Value } from '../types';
import isString from '../util/is-string';
import isValidGroup from '../util/is-valid-group';
import Property from './Property';

export interface XmlParameters {
    value?: 'text';
    altid?: number | string;
}

export type XmlPropertyRestConfig = [value: string, parameters?: XmlParameters, options?: PropertyOptions];

export type XmlPropertyLike = XmlProperty | XmlPropertyRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To include extended XML-encoded vCard data in a plain
 * >   vCard.
 * >
 * > Value type:  A single text value.
 * >
 * > Special notes:  The content of this property is a single XML 1.0
 * >   [W3C.REC-xml-20081126] element whose namespace MUST be explicitly
 * >   specified using the xmlns attribute and MUST NOT be the vCard 4
 * >   namespace ("urn:ietf:params:xml:ns:vcard-4.0"). (This implies
 * >   that it cannot duplicate a standard vCard property.) The element
 * >   is to be interpreted as if it was contained in a <vcard> element,
 * >   as defined in [RFC6351].
 * >
 * >   The fragment is subject to normal line folding and escaping, i.e.,
 * >   replace all backslashes with "\\", then replace all newlines with
 * >   "\n", then fold long lines.
 * >
 * >   Support for this property is OPTIONAL, but implementations of this
 * >   specification MUST preserve instances of this property when
 * >   propagating vCards.
 * >
 * >   See [RFC6351] for more information on the intended use of this
 * >   property.
 * >
 * > ABNF:
 * >   XML-param = "VALUE=text" / altid-param
 * >
 * >   XML-value = text
 * >
 * > Example _(from RFC6351)_:
 * >   XML:<a xmlns="http://www.w3.org/1999/xhtml"\n
 * >       href="http://www.example.com">My web page!</a>
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.1.5
 */
export default class XmlProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: XmlParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: XmlParameters = {}, { group = '' }: PropertyOptions = {}) {
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

    static factory(value: XmlPropertyLike): XmlProperty {
        if (value instanceof XmlProperty) return value;

        if (Array.isArray(value)) return new XmlProperty(...value);

        if (isString(value)) return new XmlProperty(value);

        throw new TypeError(`The value "${value}" is not a XmlPropertyLike type`);
    }
}
