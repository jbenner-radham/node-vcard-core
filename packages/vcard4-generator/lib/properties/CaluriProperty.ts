import type { Altid, Cardinality, CommonParameters, Group, Pid, Pref, Options, Type, Value } from '../types.js';
import { getInvalidPidParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPidParameter from '../util/is-valid-pid-parameter.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export type CaluriParameters = {
    value?: Extract<Value, 'uri'>;
    pid?: Pid;
    pref?: Pref;
    type?: Type;
    mediatype?: string;
    altid?: Altid;
} & CommonParameters;

export type CaluriRestConfig = [value: string, parameters?: CaluriParameters, options?: Options];

/** @todo Add URL type support. */
export type CaluriConfig = CaluriProperty | CaluriRestConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the URI for a calendar associated with the
 * >   object represented by the vCard.
 * >
 * > Value type:  A single URI value.
 * >
 * > Special notes: Where multiple CALURI properties are specified, the
 * >   default CALURI property is indicated with the PREF parameter. The
 * >   property should contain a URI pointing to an iCalendar [RFC5545]
 * >   object associated with a snapshot of the user's calendar store.
 * >   If the iCalendar object is represented as a file or document, its
 * >   file extension should be ".ics".
 * >
 * > ABNF:
 * >   CALURI-param = "VALUE=uri" / pid-param / pref-param / type-param
 * >                / mediatype-param / altid-param / any-param
 * >   CALURI-value = URI
 * >
 * > Examples:
 * >   CALURI;PREF=1:http://cal.example.com/calA
 * >   CALURI;MEDIATYPE=text/calendar:ftp://ftp.example.com/calA.ics
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.9.3 RFC 6350 - vCard Format Specification § CALURI}
 */
export default class CaluriProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    group: Group;

    parameters: CaluriParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: CaluriParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        CaluriProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: CaluriConfig): CaluriProperty {
        if (value instanceof CaluriProperty) return value;

        if (Array.isArray(value)) return new CaluriProperty(...value);

        if (isString(value)) return new CaluriProperty(value);

        throw new TypeError(`The value "${value}" is not a CaluriConfig type`);
    }

    static validateParameters({ pid, pref }: CaluriParameters): void {
        if (pid !== undefined && !isValidPidParameter(pid)) {
            throw new TypeError(getInvalidPidParameterMessage({ pid }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
