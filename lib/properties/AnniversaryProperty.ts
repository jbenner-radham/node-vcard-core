import isPlainObject from 'lodash.isplainobject';
import isString from '../util/is-string';
import { Cardinality } from '../types';
import Property from './Property';

export interface AnniversaryParameters {
    altid?: number | string;
    calscale?: 'gregorian'; // For `date-and-or-time` type only!
}

export interface AnniversaryPropertyConfig {
    value: string;
    parameters?: AnniversaryParameters;
}

/** @todo Add Date type support. */
export type AnniversaryPropertyLike = AnniversaryProperty | AnniversaryPropertyConfig | string;

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

    [VALUE]: string;

    constructor(config: AnniversaryPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as AnniversaryPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (isString(config)) {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a AnniversaryPropertyConfig or string type`);
    }

    toString() {
        return `ANNIVERSARY${this.getParametersString()}:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: AnniversaryPropertyLike): AnniversaryProperty {
        if (value instanceof AnniversaryProperty) return value;

        if (isPlainObject(value) || isString(value)) return new AnniversaryProperty(value);

        throw new TypeError(`The value "${value}" is not a AnniversaryPropertyLike type`);
    }
}
