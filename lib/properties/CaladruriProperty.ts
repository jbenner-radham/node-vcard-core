import isPlainObject from 'lodash.isplainobject';
import isString from '../util/is-string';
import { Cardinality, Type } from '../types';
import Property from './Property';

export interface CaladruriParameters {
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
    mediatype?: string;
    altid?: number | string;
}

export interface CaladruriPropertyConfig {
    value: string;
    parameters?: CaladruriParameters;
}

/** @todo Add URL type support? */
export type CaladruriPropertyLike = CaladruriProperty | CaladruriPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the calendar user address [RFC5545] to which a
 * >   scheduling request [RFC5546] should be sent for the object
 * >   represented by the vCard.
 * >
 * > Value type:  A single URI value.
 * >
 * > Special notes:  Where multiple CALADRURI properties are specified,
 * >   the default CALADRURI property is indicated with the PREF
 * >   parameter.
 * >
 * > ABNF:
 * >   CALADRURI-param = "VALUE=uri" / pid-param / pref-param / type-param
 * >                   / mediatype-param / altid-param / any-param
 * >   CALADRURI-value = URI
 * >
 * > Example _(sic)_:
 * >   CALADRURI;PREF=1:mailto:janedoe@example.com
 * >   CALADRURI:http://example.com/calendar/jdoe
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.9.2
 */
export default class CaladruriProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    parameters: CaladruriParameters;

    [VALUE]: string;

    constructor(config: CaladruriPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as CaladruriPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (isString(config)) {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a CaladruriPropertyConfig or string type`);
    }

    toString() {
        return `CALADRURI${this.getParametersString()}:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: CaladruriPropertyLike): CaladruriProperty {
        if (value instanceof CaladruriProperty) return value;

        if (isPlainObject(value) || isString(value)) return new CaladruriProperty(value);

        throw new TypeError(`The value "${value}" is not a CaladruriPropertyLike type`);
    }
}
