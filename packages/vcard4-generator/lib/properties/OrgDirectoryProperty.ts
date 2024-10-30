import type { Cardinality, Group, Pid, Pref, Options, Type, Value } from '../types.js';
import { getInvalidIndexParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidIndexParameter from '../util/is-valid-index-parameter.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export interface OrgDirectoryParameters {
    altid?: number | string;
    index?: number; // > INDEX values must be strictly positive. Zero is not allowed. _(integer)_
    language?: string;
    pid?: Pid;
    pref?: Pref;
    type?: Type;
}

export type OrgDirectoryRestConfig = [
    value: string,
    parameters?: OrgDirectoryParameters,
    options?: Options
];

export type OrgDirectoryConfig = OrgDirectoryProperty | OrgDirectoryRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify a directory of an organization to which the
 * >           vCard's entity belongs.
 * >
 * > Value type:  A single URI value.
 * >
 * > Description:  This is intended to be a URI that can be used to do an
 * >               organization-directory lookup. Presumably, the entity
 * >               the vCard represents would be found in the directory,
 * >               though that isn't required. This might be used to make
 * >               it easier to find someone's coworkers, management
 * >               chain, and so on, in a company or organizational
 * >               directory.
 * >
 * >               How the lookup is done depends upon the URI scheme, and
 * >               no attempt is made here to specify details of the
 * >               lookup mechanism. An HTTP URI might, for example, lead
 * >               to a web form that's intended for manual lookup in a
 * >               browser; thus, this URI might or might not be usable
 * >               for automated lookup or searching.
 * >
 * > Format definition:
 * >   ORG-DIRECTORY-param = pref-param / INDEX-param / language-param
 * >                         / pid-param / pref-param / altid-param /
 * >                         type-param / any-param
 * >
 * >   ORG-DIRECTORY-value = uri
 * >
 * > Examples:
 * >   ORG-DIRECTORY;INDEX=1:http://directory.mycompany.example.com
 * >
 * >   ORG-DIRECTORY;PREF=1:ldap://ldap.tech.example/
 * >   o=Example%20Tech,ou=Engineering
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6715/#section-2.4 RFC 6715 - vCard Format Extensions: Representing vCard Extensions Defined by the Open Mobile Alliance (OMA) Converged Address Book (CAB) Group § Property: ORG-DIRECTORY}
 */
export default class OrgDirectoryProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    group: Group;

    parameters: OrgDirectoryParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: OrgDirectoryParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        OrgDirectoryProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: OrgDirectoryConfig): OrgDirectoryProperty {
        if (value instanceof OrgDirectoryProperty) return value;

        if (Array.isArray(value)) return new OrgDirectoryProperty(...value);

        if (isString(value)) return new OrgDirectoryProperty(value);

        throw new TypeError(`The value "${value}" is not a OrgDirectoryConfig type`);
    }

    static validateParameters({ index, pref }: OrgDirectoryParameters): void {
        if (index && !isValidIndexParameter(index)) {
            throw new TypeError(getInvalidIndexParameterMessage({ index }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
