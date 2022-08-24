import type { Cardinality, Group, PropertyOptions, Type, Value } from '../types';
import { getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidGroup from '../util/is-valid-group';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export interface RoleParameters {
    value?: 'text';
    language?: string;
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
    altid?: number | string;
}

export type RolePropertyRestConfig = [value: string, parameters?: RoleParameters, options?: PropertyOptions];

export type RolePropertyLike = RoleProperty | RolePropertyRestConfig | string;

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

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

    parameters: RoleParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: RoleParameters = {}, { group = '' }: PropertyOptions = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        RoleProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: RolePropertyLike): RoleProperty {
        if (value instanceof RoleProperty) return value;

        if (Array.isArray(value)) return new RoleProperty(...value);

        if (isString(value)) return new RoleProperty(value);

        throw new TypeError(`The value "${value}" is not a RolePropertyLike type`);
    }

    static validateParameters({ pref }: RoleParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
