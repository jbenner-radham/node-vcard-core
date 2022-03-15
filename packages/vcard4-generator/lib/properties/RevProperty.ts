import { Cardinality, Value } from '../types';
import isString from '../util/is-string';
import Property from './Property';

export interface RevParameters {
    value?: 'timestamp';
}

export type RevPropertyConfig = [value: string, parameters?: RevParameters];

/** @todo Add Date type support. */
export type RevPropertyLike = RevProperty | RevPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify revision information about the current vCard.
 * >
 * > Value type:  A single timestamp value.
 * >
 * > Special notes:  The value distinguishes the current revision of the
 * >   information in this vCard for other renditions of the information.
 * >
 * > ABNF:
 * >   REV-param = "VALUE=timestamp" / any-param
 * >   REV-value = timestamp
 * >
 * > Example:
 * >   REV:19951031T222710Z
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.4
 */
export default class RevProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'timestamp';

    parameters: RevParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: RevParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: RevPropertyLike): RevProperty {
        if (value instanceof RevProperty) return value;

        if (Array.isArray(value)) return new RevProperty(...value);

        if (isString(value)) return new RevProperty(value);

        throw new TypeError(`The value "${value}" is not a RevPropertyLike type`);
    }
}
