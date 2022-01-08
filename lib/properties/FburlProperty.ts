import isPlainObject from 'lodash.isplainobject';
import isString from '../util/is-string';
import { Cardinality, Type } from '../types';
import Property from './Property';

export interface FburlParameters {
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
    mediatype?: string;
    altid?: number | string;
}

export interface FburlPropertyConfig {
    value: string;
    parameters?: FburlParameters;
}

/** @todo Add URL type support? */
export type FburlPropertyLike = FburlProperty | FburlPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the URI for the busy time associated with the
 * >   object that the vCard represents.
 * >
 * > Value type:  A single URI value.
 * >
 * > Special notes:  Where multiple FBURL properties are specified, the
 * >   default FBURL property is indicated with the PREF parameter.  The
 * >   FTP [RFC1738] or HTTP [RFC2616] type of URI points to an iCalendar
 * >   [RFC5545] object associated with a snapshot of the next few weeks
 * >   or months of busy time data.  If the iCalendar object is
 * >   represented as a file or document, its file extension should be
 * >   ".ifb".
 * >
 * > ABNF:
 * >   FBURL-param = "VALUE=uri" / pid-param / pref-param / type-param
 * >               / mediatype-param / altid-param / any-param
 * >   FBURL-value = URI
 * >
 * > Examples:
 * >   FBURL;PREF=1:http://www.example.com/busy/janedoe
 * >   FBURL;MEDIATYPE=text/calendar:ftp://example.com/busy/project-a.ifb
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.9.1
 */
export default class FburlProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(config: FburlPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as FburlPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (isString(config)) {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a FburlPropertyConfig or string type`);
    }

    toString() {
        return `FBURL${this.getParametersString()}:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: FburlPropertyLike): FburlProperty {
        if (value instanceof FburlProperty) return value;

        if (isPlainObject(value) || isString(value)) return new FburlProperty(value);

        throw new TypeError(`The value "${value}" is not a FburlPropertyLike type`);
    }
}
