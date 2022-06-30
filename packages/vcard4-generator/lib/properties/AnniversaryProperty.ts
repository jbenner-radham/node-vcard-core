import { Calscale, Cardinality, Value } from '../types';
import { getInvalidCalscaleValueParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import Property from './Property';

export interface AnniversaryParameters {
    value?: 'date-and-or-time' | 'text';
    altid?: number | string;
    calscale?: Calscale; // For `date-and-or-time` type only!
}

export type AnniversaryPropertyRestConfig = [value: string, parameters?: AnniversaryParameters];

/** @todo Add Date type support. */
export type AnniversaryPropertyLike = AnniversaryProperty | AnniversaryPropertyRestConfig | string;

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
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.6
 * @todo Add enforcement of calscale-param for only date-and-or-time types!
 */
export default class AnniversaryProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'date-and-or-time';

    parameters: AnniversaryParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: AnniversaryParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        AnniversaryProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: AnniversaryPropertyLike): AnniversaryProperty {
        if (value instanceof AnniversaryProperty) return value;

        if (Array.isArray(value)) return new AnniversaryProperty(...value);

        if (isString(value)) return new AnniversaryProperty(value);

        throw new TypeError(`The value "${value}" is not a AnniversaryPropertyLike type`);
    }

    static validateParameters({ calscale, value }: AnniversaryParameters): void {
        if (calscale && value && value?.toLowerCase() !== 'date-and-or-time') {
            throw new TypeError(getInvalidCalscaleValueParameterMessage({ value }));
        }
    }
}
