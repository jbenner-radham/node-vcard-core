import type { Cardinality, CommonParameters, Group, Pref, Options, Value } from '../types.js';
import { getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export type ContactUriParameters = {
    value?: Extract<Value, 'uri'>;
    pref?: Pref;
} & CommonParameters;

export type ContactUriRestConfig = [value: string, parameters?: ContactUriParameters, options?: Options];

export type ContactUriConfig = ContactUriProperty | ContactUriRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  RDAP entity information can be redacted under certain
 * >   circumstances (e.g., privacy). The Temporary Specification requires
 * >   that RDAP entity objects representing "Registrant", "Admin", and
 * >   "Tech" contacts contain an email address or a location for a web form
 * >   to facilitate email communication with the relevant contact in a way
 * >   that does not identify the associated individual. The CONTACT-URI
 * >   property can be used to include URIs representing an email address or
 * >   a location for a web form.
 * >
 * > Value type:  A single URI value.
 * >
 * > Description:  At least one "mailto", "http", or "https" URI value MUST
 * >   be provided. Additional CONTACT-URI properties MAY be provided to
 * >   describe other contact methods. If multiple CONTACT-URI properties
 * >   are used, the vCard PREF parameter MUST be used to describe the most
 * >   preferred property as described in Section 5.3 of RFC 6350 [RFC6350].
 * >
 * > Format definition:
 * >   CONTACT-URI-param = "VALUE=uri" / pref-param ; pref-param from
 * >   [RFC6350]
 * >
 * >   CONTACT-URI-value = uri ; uri from [RFC3986]
 * >
 * > Examples:
 * >   CONTACT-URI:https://contact.example.com
 * >
 * >   CONTACT-URI;PREF=1:mailto:contact@example.com
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc8605/#section-2.1 RFC 8605 - vCard Format Extensions: ICANN Extensions for the Registration Data Access Protocol (RDAP) § Property: CONTACT-URI}
 */
export default class ContactUriProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    group: Group;

    parameters: ContactUriParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: ContactUriParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        ContactUriProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: ContactUriConfig): ContactUriProperty {
        if (value instanceof ContactUriProperty) return value;

        if (Array.isArray(value)) return new ContactUriProperty(...value);

        if (isString(value)) return new ContactUriProperty(value);

        throw new TypeError(`The value "${value}" is not a ContactUriConfig type`);
    }

    static validateParameters({ pref }: ContactUriParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
