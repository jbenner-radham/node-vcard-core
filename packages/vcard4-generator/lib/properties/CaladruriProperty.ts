import type { Cardinality, Group, Pref, PropertyOptions, Type, Value } from '../types.js';
import { getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export interface CaladruriParameters {
    value?: 'uri';
    pid?: number | number[];
    pref?: Pref;
    type?: Type;
    mediatype?: string;
    altid?: number | string;
}

export type CaladruriRestConfig = [value: string, parameters?: CaladruriParameters, options?: PropertyOptions];

/** @todo Add URL type support? */
export type CaladruriConfig = CaladruriProperty | CaladruriRestConfig | string;

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
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.9.2 RFC 6350 - vCard Format Specification § CALADRURI}
 */
export default class CaladruriProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    group: Group;

    parameters: CaladruriParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: CaladruriParameters = {}, { group = '' }: PropertyOptions = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        CaladruriProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: CaladruriConfig): CaladruriProperty {
        if (value instanceof CaladruriProperty) return value;

        if (Array.isArray(value)) return new CaladruriProperty(...value);

        if (isString(value)) return new CaladruriProperty(value);

        throw new TypeError(`The value "${value}" is not a CaladruriConfig type`);
    }

    static validateParameters({ pref }: CaladruriParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
