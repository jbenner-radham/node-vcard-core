import { Cardinality, Value } from '../types';
import { getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export interface ContactUriParameters {
    value?: 'uri';
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
}

export type ContactUriPropertyRestParameter = [value: string, parameters?: ContactUriParameters];

export type ContactUriPropertyLike = ContactUriProperty | ContactUriPropertyRestParameter | string;

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
 * @see https://datatracker.ietf.org/doc/html/rfc8605/#section-2.1
 */
export default class ContactUriProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    parameters: ContactUriParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: ContactUriParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        ContactUriProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: ContactUriPropertyLike): ContactUriProperty {
        if (value instanceof ContactUriProperty) return value;

        if (Array.isArray(value)) return new ContactUriProperty(...value);

        if (isString(value)) return new ContactUriProperty(value);

        throw new TypeError(`The value "${value}" is not a ContactUriPropertyLike type`);
    }

    static validateParameters({ pref }: ContactUriParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
