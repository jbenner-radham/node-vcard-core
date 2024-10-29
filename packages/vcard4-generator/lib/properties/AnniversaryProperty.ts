import type { Calscale, Cardinality, Group, PropertyOptions, Value } from '../types.js';
import { getInvalidCalscaleValueParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import Property from './Property.js';

export interface AnniversaryParameters {
    value?: 'date-and-or-time' | 'text';
    altid?: number | string;
    calscale?: Calscale; // For `date-and-or-time` type only!
}

export type AnniversaryRestConfig = [
    value: string,
    parameters?: AnniversaryParameters,
    options?: PropertyOptions
];

/** @todo Add Date type support. */
export type AnniversaryConfig = AnniversaryProperty | AnniversaryRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  The date of marriage, or equivalent, of the object the
 * >   vCard represents.
 * >
 * > Value type:  The default is a single date-and-or-time value. It can
 * >   also be reset to a single text value.
 * >
 * > ABNF:
 * >   ANNIVERSARY-param = "VALUE=" ("date-and-or-time" / "text")
 * >   ANNIVERSARY-value = date-and-or-time / text
 * >     ; Value and parameter MUST match.
 * >
 * >   ANNIVERSARY-param =/ altid-param / calscale-param / any-param
 * >     ; calscale-param can only be present when ANNIVERSARY-value is
 * >     ; date-and-or-time and actually contains a date or date-time.
 * >
 * > Examples _(sic)_:
 * >   ANNIVERSARY:19960415
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.6 RFC 6350 - vCard Format Specification § ANNIVERSARY}
 * @todo Add enforcement of calscale-param for only date-and-or-time types!
 */
export default class AnniversaryProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'date-and-or-time';

    group: Group;

    parameters: AnniversaryParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: AnniversaryParameters = {}, { group = '' }: PropertyOptions = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        AnniversaryProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: AnniversaryConfig): AnniversaryProperty {
        if (value instanceof AnniversaryProperty) return value;

        if (Array.isArray(value)) return new AnniversaryProperty(...value);

        if (isString(value)) return new AnniversaryProperty(value);

        throw new TypeError(`The value "${value}" is not a AnniversaryConfig type`);
    }

    static validateParameters({ calscale, value }: AnniversaryParameters): void {
        if (calscale && value && value?.toLowerCase() !== 'date-and-or-time') {
            throw new TypeError(getInvalidCalscaleValueParameterMessage({ value }));
        }
    }
}
