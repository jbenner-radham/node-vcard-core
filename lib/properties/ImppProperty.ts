import { Cardinality, Type, Value } from '../types';
import { getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export interface ImppParameters {
    value?: 'uri';
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: Type;
    mediatype?: string;
    altid?: number | string;
}

export type ImppPropertyConfig = [value: string, parameters?: ImppParameters];

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

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    parameters: ImppParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: ImppParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        ImppProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: ImppPropertyLike): ImppProperty {
        if (value instanceof ImppProperty) return value;

        if (Array.isArray(value)) return new ImppProperty(...value);

        if (isString(value)) return new ImppProperty(value);

        throw new TypeError(`The value "${value}" is not a ImppPropertyLike type`);
    }

    static validateParameters({ pref }: ImppParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
