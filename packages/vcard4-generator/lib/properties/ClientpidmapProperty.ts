import type { Cardinality, Group, PropertyOptions, Value } from '../types';
import isString from '../util/is-string';
import isValidGroup from '../util/is-valid-group';
import Property from './Property';

export interface ClientpidmapParameters {
    [key: string]: never;
}

export type ClientpidmapPropertyRestConfig = [
    value: string,
    parameters?: ClientpidmapParameters,
    options?: PropertyOptions
];

export type ClientpidmapPropertyLike = ClientpidmapProperty | ClientpidmapPropertyRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To give a global meaning to a local PID source identifier.
 * >
 * > Value type:  A semicolon-separated pair of values. The first field
 * >   is a small integer corresponding to the second field of a PID
 * >   parameter instance. The second field is a URI. The "uuid" URN
 * >   namespace defined in [RFC4122] is particularly well suited to this
 * >   task, but other URI schemes MAY be used.
 * >
 * > Special notes:  PID source identifiers (the source identifier is the
 * >   second field in a PID parameter instance) are small integers that
 * >   only have significance within the scope of a single vCard
 * >   instance. Each distinct source identifier present in a vCard MUST
 * >   have an associated CLIENTPIDMAP. See Section 7 for more details
 * >   on the usage of CLIENTPIDMAP.
 * >
 * >   PID source identifiers MUST be strictly positive. Zero is not
 * >   allowed.
 * >
 * >   As a special exception, the PID parameter MUST NOT be applied to
 * >   this property.
 * >
 * > ABNF:
 * >   CLIENTPIDMAP-param = any-param
 * >   CLIENTPIDMAP-value = 1*DIGIT ";" URI
 * >
 * > Example:
 * >   TEL;PID=3.1,4.2;VALUE=uri:tel:+1-555-555-5555
 * >   EMAIL;PID=4.1,5.2:jdoe@example.com
 * >   CLIENTPIDMAP:1;urn:uuid:3df403f4-5924-4bb7-b077-3c711d9eb34b
 * >   CLIENTPIDMAP:2;urn:uuid:d89c9c7a-2e1b-4832-82de-7e992d95faa5
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.7 RFC 6350 - vCard Format Specification § CLIENTPIDMAP}
 */
export default class ClientpidmapProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: ClientpidmapParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: ClientpidmapParameters = {}, { group = '' }: PropertyOptions = {}) {
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

    static factory(value: ClientpidmapPropertyLike): ClientpidmapProperty {
        if (value instanceof ClientpidmapProperty) return value;

        if (Array.isArray(value)) return new ClientpidmapProperty(...value);

        if (isString(value)) return new ClientpidmapProperty(value);

        throw new TypeError(`The value "${value}" is not a ClientpidmapPropertyLike type`);
    }
}
