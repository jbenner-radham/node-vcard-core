import isPlainObject from 'lodash.isplainobject';
import { Cardinality, Value } from '../types';
import foldLine from '../util/fold-line';
import isString from '../util/is-string';
import Property from './Property';

export interface RevParameters {
    value?: 'timestamp';
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

    static readonly DEFAULT_VALUE_TYPE: Value = 'timestamp';

    parameters: RevParameters = {};

    [VALUE]: string;

    #objectConstructor(config: RevPropertyConfig) {
        const { value, parameters = {} } = config;
        this.parameters = parameters;
        this[VALUE] = value;

        return this;
    }

    #stringConstructor(value: string) {
        this[VALUE] = value;

        return this;
    }

    constructor(config: RevPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            return this.#objectConstructor(config as RevPropertyConfig);
        }

        if (isString(config)) {
            return this.#stringConstructor(config);
        }

        throw new TypeError(`The value "${config}" is not a RevPropertyConfig or string type`);
    }

    toString() {
        const parameters = this.getParametersString();
        const value = this.valueOf();

        return foldLine(`REV${parameters}:${value}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: RevPropertyLike): RevProperty {
        if (value instanceof RevProperty) return value;

        if (isPlainObject(value) || isString(value)) return new RevProperty(value);

        throw new TypeError(`The value "${value}" is not a RevPropertyLike type`);
    }
}
