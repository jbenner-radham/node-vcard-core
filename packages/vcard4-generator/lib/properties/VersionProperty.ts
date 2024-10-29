import type { Cardinality, Group, PropertyOptions, Value } from '../types.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import Property from './Property.js';

export interface VersionParameters {
    value?: 'text';
}

export type VersionRestConfig = [value: string, parameters?: VersionParameters, options?: PropertyOptions];

export type VersionConfig = VersionProperty | VersionRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the version of the vCard specification used to
 * >   format this vCard.
 * >
 * > Value type:  A single text value.
 * >
 * > Special notes:  This property MUST be present in the vCard object,
 * >   and it must appear immediately after BEGIN:VCARD. The value MUST
 * >   be "4.0" if the vCard corresponds to this specification. Note
 * >   that earlier versions of vCard allowed this property to be placed
 * >   anywhere in the vCard object, or even to be absent.
 * >
 * > ABNF:
 * >   VERSION-param = "VALUE=text" / any-param
 * >   VERSION-value = "4.0"
 * >
 * > Example:
 * >   VERSION:4.0
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.9 RFC 6350 - vCard Format Specification § VERSION}
 */
export default class VersionProperty extends Property {
    static readonly CARDINALITY: Cardinality = '1'; // Exactly one instance per vCard MUST be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: VersionParameters = {};

    [VALUE]: string;

    constructor(value = '4.0', parameters: VersionParameters = {}, { group = '' }: PropertyOptions = {}) {
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

    static from(value: VersionConfig): VersionProperty {
        if (value instanceof VersionProperty) return value;

        if (Array.isArray(value)) return new VersionProperty(...value);

        if (isString(value)) return new VersionProperty(value);

        throw new TypeError(`The value "${value}" is not a VersionConfig type`);
    }
}
