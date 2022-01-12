import isPlainObject from 'lodash.isplainobject';
import { Cardinality, Type } from '../types';
import foldLine from '../util/fold-line';
import isString from '../util/is-string';
import Property from './Property';

export interface RoleParameters {
    language?: string;
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
    altid?: number | string;
}

export interface RolePropertyConfig {
    value: string;
    parameters?: RoleParameters;
}

export type RolePropertyLike = RoleProperty | RolePropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the function or part played in a particular
 * >   situation by the object the vCard represents.
 * >
 * > Value type:  A single text value.
 * >
 * > Special notes:  This property is based on the X.520 Business Category
 * >   explanatory attribute [CCITT.X520.1988]. This property is
 * >   included as an organizational type to avoid confusion with the
 * >   semantics of the TITLE property and incorrect usage of that
 * >   property when the semantics of this property is intended.
 * >
 * > ABNF:
 * >   ROLE-param = "VALUE=text" / language-param / pid-param / pref-param
 * >              / type-param / altid-param / any-param
 * >   ROLE-value = text
 * >
 * > Example:
 * >   ROLE:Project Leader
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.6.2
 */
export default class RoleProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(config: RolePropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as RolePropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (isString(config)) {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a RolePropertyConfig or string type`);
    }

    toString() {
        return foldLine(`ROLE${this.getParametersString()}:${this.getEscapedValueString()}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: RolePropertyLike): RoleProperty {
        if (value instanceof RoleProperty) return value;

        if (isPlainObject(value) || isString(value)) return new RoleProperty(value);

        throw new TypeError(`The value "${value}" is not a RolePropertyLike type`);
    }
}
