import type { Altid, Calscale, Cardinality, Group, Options, Value } from '../types.js';
import {
    getInvalidCalscaleValueParameterMessage,
    getInvalidLanguageValueParameterMessage
} from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import Property from './Property.js';

type BdayCommonParameters = {
    altid?: Altid;
};

type BdayDateAndOrTimeOrUndefinedValueParameters = {
    value?: Extract<Value, 'date-and-or-time'>;
    calscale?: Calscale;
} & BdayCommonParameters;

type BdayTextValueParameters = {
    value: Extract<Value, 'text'>;
    language?: string;
} & BdayCommonParameters;

export type BdayParameters = BdayDateAndOrTimeOrUndefinedValueParameters | BdayTextValueParameters;

export type BdayRestConfig = [value: string, parameters?: BdayParameters, options?: Options];

/** @todo Add Date type support. */
export type BdayConfig = BdayProperty | BdayRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the birth date of the object the vCard
 * >   represents.
 * >
 * > Value type:  The default is a single date-and-or-time value. It can
 * >   also be reset to a single text value.
 * >
 * > ABNF:
 * >   BDAY-param = BDAY-param-date / BDAY-param-text
 * >   BDAY-value = date-and-or-time / text
 * >     ; Value and parameter MUST match.
 * >
 * >   BDAY-param-date = "VALUE=date-and-or-time"
 * >   BDAY-param-text = "VALUE=text" / language-param
 * >
 * >   BDAY-param =/ altid-param / calscale-param / any-param
 * >     ; calscale-param can only be present when BDAY-value is
 * >     ; date-and-or-time and actually contains a date or date-time.
 * >
 * > Examples:
 * >   BDAY:19960415
 * >   BDAY:--0415
 * >   BDAY;19531015T231000Z
 * >   BDAY;VALUE=text:circa 1800
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.5 RFC 6350 - vCard Format Specification § BDAY}
 */
export default class BdayProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'date-and-or-time';

    group: Group;

    parameters: BdayParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: BdayParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        BdayProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: BdayConfig): BdayProperty {
        if (value instanceof BdayProperty) return value;

        if (Array.isArray(value)) return new BdayProperty(...value);

        if (isString(value)) return new BdayProperty(value);

        throw new TypeError(`The value "${value}" is not a BdayConfig type`);
    }

    static validateParameters(parameters: BdayParameters): void {
        const { calscale, language, value } = parameters as Record<string, unknown>;

        if (calscale && isString(value) && value.toLowerCase() !== 'date-and-or-time') {
            throw new TypeError(getInvalidCalscaleValueParameterMessage({ value }));
        }

        if (language && (!value || (isString(value) && value.toLowerCase() !== 'text'))) {
            throw new TypeError(getInvalidLanguageValueParameterMessage({ value }));
        }
    }
}
