import isPlainObject from 'lodash.isplainobject';
import isString from '../util/is-string';
import { Cardinality, Type } from '../types';
import Property from './Property';

export interface ImppParameters {
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
    mediatype?: string;
    altid?: number | string;
}

export interface ImppPropertyConfig {
    value: string;
    parameters?: ImppParameters;
}

export type ImppPropertyLike = ImppProperty | ImppPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the URI for instant messaging and presence
 * >   protocol communications with the object the vCard represents.
 * >
 * > Value type:  A single URI.
 * >
 * > Special notes:  The property may include the "PREF" parameter to
 * >   indicate that this is a preferred address and has the same
 * >   semantics as the "PREF" parameter in a TEL property.
 * >   If this property's value is a URI that can be used for voice
 * >   and/or video, the TEL property (Section 6.4.1) SHOULD be used in
 * >   addition to this property.
 * >
 * >   This property is adapted from [RFC4770], which is made obsolete by
 * >   this document.
 * >
 * > ABNF:
 * >   IMPP-param = "VALUE=uri" / pid-param / pref-param / type-param
 * >              / mediatype-param / altid-param / any-param
 * >   IMPP-value = URI
 * >
 * > Example:
 * >   IMPP;PREF=1:xmpp:alice@example.com
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.4.3
 */
export default class ImppProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(config: ImppPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as ImppPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (isString(config)) {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a ImppPropertyConfig or string type`);
    }

    toString() {
        return `IMPP${this.getParametersString()}:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: ImppPropertyLike): ImppProperty {
        if (value instanceof ImppProperty) return value;

        if (isPlainObject(value) || isString(value)) return new ImppProperty(value);

        throw new TypeError(`The value "${value}" is not a ImppPropertyLike type`);
    }
}
