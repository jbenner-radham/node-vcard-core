import type { Cardinality, Group, Options, Value } from '../types.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import Property from './Property.js';

export interface DeathplaceParameters {
    value?: 'text' | 'uri';
    altid?: number | string;
    language?: string;
}

export type DeathplaceRestConfig = [
    value: string,
    parameters?: DeathplaceParameters,
    options?: Options
];

/** @todo Add URL support. */
export type DeathplaceConfig = DeathplaceProperty | DeathplaceRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the place of death of the object the vCard
 * >           represents.
 * >
 * > Value type:  A single text value (default) or a single URI value.
 * >
 * > Format definition:
 * >   DEATHPLACE-param = "VALUE=" ("text" / "uri")
 * >   DEATHPLACE-value = text / uri
 * >      ; Value type and VALUE parameter MUST match.
 * >
 * >   DEATHPLACE-param =/ altid-param / language-param / any-param
 * >
 * > Examples:
 * >   DEATHPLACE:Aboard the Titanic\, near Newfoundland
 * >   DEATHPLACE;VALUE=uri:http://example.com/ships/titanic.vcf
 * >   DEATHPLACE;VALUE=uri:geo:41.731944\,-49.945833
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6474/#section-2.2 RFC 6474 - vCard Format Extensions: Place of Birth, Place and Date of Death § Property: DEATHPLACE}
 */
export default class DeathplaceProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: DeathplaceParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: DeathplaceParameters = {}, { group = '' }: Options = {}) {
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

    static from(value: DeathplaceConfig): DeathplaceProperty {
        if (value instanceof DeathplaceProperty) return value;

        if (Array.isArray(value)) return new DeathplaceProperty(...value);

        if (isString(value)) return new DeathplaceProperty(value);

        throw new TypeError(`The value "${value}" is not a DeathplaceConfig type`);
    }
}
