import type { Calscale, Cardinality, Group, PropertyOptions, Value } from '../types.js';
import {
    getInvalidCalscaleValueParameterMessage,
    getInvalidLanguageValueParameterMessage
} from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import Property from './Property.js';

export interface DeathdateParameters {
    value?: 'date-and-or-time' | 'text';
    altid?: number | string;
    calscale?: Calscale; // For `date-and-or-time` type only!
    language?: string; // For `text` type only!
}

export type DeathdateRestConfig = [value: string, parameters?: DeathdateParameters, options?: PropertyOptions];

/** @todo Add Date support. */
export type DeathdateConfig = DeathdateProperty | DeathdateRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the date of death of the object the vCard
 * >           represents.
 * >
 * > Value type:  The default is a single date-and-or-time value. It can
 * >              also be reset to a single text value.
 * >
 * > Description:  The presence of a DEATHDATE property indicates that the
 * >               subject of the vCard is known to be dead. The absence
 * >               of this property makes no statement one way or the
 * >               other.
 * >
 * > Format definition:
 * >   DEATHDATE-param = DEATHDATE-param-date / DEATHDATE-param-text
 * >   DEATHDATE-value = date-and-or-time / text
 * >      ; Value type and VALUE parameter MUST match.
 * >
 * >   DEATHDATE-param-date = "VALUE=date-and-or-time" / calscale-param
 * >      ; calscale-param can only be present when DEATHDATE-value is
 * >      ; date-and-or-time and actually contains a date or date-time.
 * >
 * >   DEATHDATE-param-text = "VALUE=text" / language-param
 * >
 * >   DEATHDATE-param =/ altid-param / any-param
 * >
 * > Examples:
 * >   DEATHDATE:19960415
 * >   DEATHDATE:--0415
 * >   DEATHDATE:19531015T231000Z
 * >   DEATHDATE;VALUE=text:circa 1800
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6474/#section-2.3 RFC 6474 - vCard Format Extensions: Place of Birth, Place and Date of Death § Property: DEATHDATE}
 */
export default class DeathdateProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'date-and-or-time';

    group: Group;

    parameters: DeathdateParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: DeathdateParameters = {}, { group = '' }: PropertyOptions = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        DeathdateProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: DeathdateConfig): DeathdateProperty {
        if (value instanceof DeathdateProperty) return value;

        if (Array.isArray(value)) return new DeathdateProperty(...value);

        if (isString(value)) return new DeathdateProperty(value);

        throw new TypeError(`The value "${value}" is not a DeathdateConfig type`);
    }

    static validateParameters({ calscale, language, value }: DeathdateParameters): void {
        if (calscale && value && value?.toLowerCase() !== 'date-and-or-time') {
            throw new TypeError(getInvalidCalscaleValueParameterMessage({ value }));
        }

        if (language && (!value || value?.toLowerCase() !== 'text')) {
            throw new TypeError(getInvalidLanguageValueParameterMessage({ value }));
        }
    }
}
