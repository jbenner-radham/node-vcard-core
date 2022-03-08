import isPlainObject from 'lodash.isplainobject';
import { Cardinality, Value } from '../types';
import isString from '../util/is-string';
import Property from './Property';

export interface VersionParameters {
    value?: 'text';
}

export interface VersionPropertyConfig {
    value: string;
    parameters?: VersionParameters;
}

export type VersionPropertyLike = VersionProperty | VersionPropertyConfig | string;

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
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.9
 */
export default class VersionProperty extends Property {
    static readonly CARDINALITY: Cardinality = '1'; // Exactly one instance per vCard MUST be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    [VALUE]: string;

    constructor(config: VersionPropertyConfig | string = '4.0') {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as VersionPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (isString(config)) {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a VersionPropertyConfig or string type`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: VersionPropertyLike): VersionProperty {
        if (value instanceof VersionProperty) return value;

        if (isPlainObject(value) || isString(value)) return new VersionProperty(value);

        throw new TypeError(`The value "${value}" is not a VersionPropertyLike type`);
    }
}
