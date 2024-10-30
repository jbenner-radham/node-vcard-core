import type { Altid, Cardinality, Group, Pid, Pref, Options, Type, Value } from '../types.js';
import { getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export interface EmailParameters {
    value?: Extract<Value, 'text'>;
    pid?: Pid;
    pref?: Pref;
    type?: Type;
    altid?: Altid;
}

export type EmailRestConfig = [value: string, parameters?: EmailParameters, options?: Options];

export type EmailConfig = EmailProperty | EmailRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the electronic mail address for communication
 * >   with the object the vCard represents.
 * >
 * > Value type:  A single text value.
 * >
 * > Special note:  The property can include tye _(sic)_ "PREF" parameter to
 * >   indicate a preferred-use email address when more than one is
 * >   specified.
 * >
 * >   Even though the value is free-form UTF-8 text, it is likely to be
 * >   interpreted by a Mail User Agent (MUA) as an "addr-spec", as
 * >   defined in [RFC5322], Section 3.4.1. Readers should also be aware
 * >   of the current work toward internationalized email addresses
 * >   [RFC5335bis].
 * >
 * > ABNF:
 * >   EMAIL-param = "VALUE=text" / pid-param / pref-param / type-param
 * >               / altid-param / any-param
 * >   EMAIL-value = text
 * >
 * > Example:
 * >   EMAIL;TYPE=work:jqpublic@xyz.example.com
 * >   EMAIL;PREF=1:jane_doe@example.com
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.4.2 RFC 6350 - vCard Format Specification § EMAIL}
 */
export default class EmailProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: EmailParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: EmailParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        EmailProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: EmailConfig): EmailProperty {
        if (value instanceof EmailProperty) return value;

        if (Array.isArray(value)) return new EmailProperty(...value);

        if (isString(value)) return new EmailProperty(value);

        throw new TypeError(`The value "${value}" is not a EmailConfig type`);
    }

    static validateParameters({ pref }: EmailParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
