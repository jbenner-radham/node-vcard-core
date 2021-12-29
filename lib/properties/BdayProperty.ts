import isPlainObject from 'lodash.isplainobject';
import { Cardinality } from '../types';
import Property from './Property';

export interface BdayParameters {
    altid?: number | string;
    calscale?: 'gregorian'; // For `date-and-or-time` type only!
    language?: string; // For `text` type only!
}

export interface BdayPropertyConfig {
    value: string;
    parameters?: BdayParameters;
}

/** @todo Add Date type support. */
export type BdayPropertyLike = BdayProperty | BdayPropertyConfig | string;

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
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.5
 * @todo Add enforcement of calscale-param for only date-and-or-time types!
 * @todo Add enforcement of language-param for only text types!
 */
export default class BdayProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    parameters: BdayParameters;

    [VALUE]: string;

    constructor(config: BdayPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as BdayPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (typeof config === 'string') {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a BdayPropertyConfig or string type`);
    }

    toString() {
        const value = this.hasParameters
            ? this.getValueWithParameters()
            : this.getValue();

        return `BDAY${value}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: BdayPropertyLike): BdayProperty {
        if (value instanceof BdayProperty) return value;

        if (typeof value === 'string') return new BdayProperty(value);

        throw new TypeError(`The value "${value}" is not a BdayPropertyLike type`);
    }
}
