import isPlainObject from 'lodash.isplainobject';
import { Calscale, Cardinality, Value } from '../types';
import foldLine from '../util/fold-line';
import { getInvalidCalscaleValueParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import Property from './Property';

export interface BdayParameters {
    value?: 'date-and-or-time' | 'text';
    altid?: number | string;
    calscale?: Calscale; // For `date-and-or-time` type only!
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
 */
export default class BdayProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'date-and-or-time';

    parameters: BdayParameters = {};

    [VALUE]: string;

    #objectConstructor(config: BdayPropertyConfig) {
        const { value, parameters = {} } = config;

        BdayProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;

        return this;
    }

    #stringConstructor(value: string) {
        this[VALUE] = value;

        return this;
    }

    constructor(config: BdayPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            return this.#objectConstructor(config as BdayPropertyConfig);
        }

        if (isString(config)) {
            return this.#stringConstructor(config);
        }

        throw new TypeError(`The value "${config}" is not a BdayPropertyConfig or string type`);
    }

    toString() {
        const parameters = this.getParametersString();
        const value = this.parameters.value !== 'text'
            ? this.valueOf()
            : this.getEscapedValueString();

        return foldLine(`BDAY${parameters}:${value}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: BdayPropertyLike): BdayProperty {
        if (value instanceof BdayProperty) return value;

        if (isPlainObject(value) || isString(value)) return new BdayProperty(value);

        throw new TypeError(`The value "${value}" is not a BdayPropertyLike type`);
    }

    static validateParameters({ calscale, language, value }: BdayParameters): void {
        if (calscale && value && value?.toLowerCase() !== 'date-and-or-time') {
            throw new TypeError(getInvalidCalscaleValueParameterMessage({ value }));
        }

        if (language && (!value || value?.toLowerCase() !== 'text')) {
            throw new TypeError(
                'The LANGUAGE parameter is only valid for "text" value types. ' +
                    `The value type of "${value}" was provided`
            );
        }
    }
}
