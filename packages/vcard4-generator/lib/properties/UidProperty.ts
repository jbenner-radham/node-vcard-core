import type { Cardinality, Group, PropertyOptions, Value } from '../types';
import isString from '../util/is-string';
import isValidGroup from '../util/is-valid-group';
import Property from './Property';

export interface UidParameters {
    value?: 'uri' | 'text';
}

export type UidPropertyRestConfig = [value: string, parameters?: UidParameters, options?: PropertyOptions];

export type UidPropertyLike = UidProperty | UidPropertyRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify a value that represents a globally unique
 * >   identifier corresponding to the entity associated with the vCard.
 * >
 * > Value type:  A single URI value. It MAY also be reset to free-form
 * >   text.
 * >
 * > Special notes:  This property is used to uniquely identify the object
 * >   that the vCard represents.  The "uuid" URN namespace defined in
 * >   [RFC4122] is particularly well suited to this task, but other URI
 * >   schemes MAY be used. Free-form text MAY also be used.
 * >
 * > ABNF:
 * >   UID-param = UID-uri-param / UID-text-param
 * >   UID-value = UID-uri-value / UID-text-value
 * >     ; Value and parameter MUST match.
 * >
 * >   UID-uri-param = "VALUE=uri"
 * >   UID-uri-value = URI
 * >
 * >   UID-text-param = "VALUE=text"
 * >   UID-text-value = text
 * >
 * >   UID-param =/ any-param
 * >
 * > Example:
 * >   UID:urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.6
 */
export default class UidProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    group: Group;

    parameters: UidParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: UidParameters = {}, { group = '' }: PropertyOptions = {}) {
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

    static factory(value: UidPropertyLike): UidProperty {
        if (value instanceof UidProperty) return value;

        if (Array.isArray(value)) return new UidProperty(...value);

        if (isString(value)) return new UidProperty(value);

        throw new TypeError(`The value "${value}" is not a UidPropertyLike type`);
    }
}
