import isPlainObject from 'lodash.isplainobject';
import { Cardinality, Type, Value } from '../types';
import foldLine from '../util/fold-line';
import { getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export interface CaluriParameters {
    value?: 'uri';
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
    mediatype?: string;
    altid?: number | string;
}

export interface CaluriPropertyConfig {
    value: string;
    parameters?: CaluriParameters;
}

/** @todo Add URL type support. */
export type CaluriPropertyLike = CaluriProperty | CaluriPropertyConfig | string;

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
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.9.3
 */
export default class CaluriProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    parameters: CaluriParameters = {};

    [VALUE]: string;

    #objectConstructor(config: CaluriPropertyConfig) {
        const { value, parameters = {} } = config;

        CaluriProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;

        return this;
    }

    #stringConstructor(value: string) {
        this[VALUE] = value;

        return this;
    }

    constructor(config: CaluriPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            return this.#objectConstructor(config as CaluriPropertyConfig);
        }

        if (isString(config)) {
            return this.#stringConstructor(config);
        }

        throw new TypeError(`The value "${config}" is not a CaluriPropertyConfig or string type`);
    }

    toString() {
        return foldLine(`CALURI${this.getParametersString()}:${this.valueOf()}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: CaluriPropertyLike): CaluriProperty {
        if (value instanceof CaluriProperty) return value;

        if (isPlainObject(value) || isString(value)) return new CaluriProperty(value);

        throw new TypeError(`The value "${value}" is not a CaluriPropertyLike type`);
    }

    static validateParameters({ pref }: CaluriParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
