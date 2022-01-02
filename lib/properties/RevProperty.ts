import isPlainObject from 'lodash.isplainobject';
import { Cardinality } from '../types';
import Property from './Property';

export interface RevParameters {
    [key: string]: never;
}

export interface RevPropertyConfig {
    value: string;
    parameters?: RevParameters;
}

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

    [VALUE]: string;

    constructor(config: RevPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value } = config as RevPropertyConfig;
            this[VALUE] = value;

            return;
        }

        if (typeof config === 'string') {
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a RevPropertyConfig or string type`);
    }

    toString() {
        return `REV:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: RevPropertyLike): RevProperty {
        if (value instanceof RevProperty) return value;

        if (typeof value === 'string') return new RevProperty(value);

        throw new TypeError(`The value "${value}" is not a RevPropertyLike type`);
    }
}
