import { Cardinality, Value } from '../types';
import foldLine from '../util/fold-line';
import { getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export interface SourceParameters {
    value?: 'uri';
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    altid?: number | string;
    mediatype?: string;
}

export type SourcePropertyConfig = [value: string, parameters?: SourceParameters];

/** Add URL type support? */
export type SourcePropertyLike = SourceProperty | SourcePropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To identify the source of directory information contained
 * >   in the content type.
 * >
 * > Value type:  uri
 * >
 * > Special notes:  The SOURCE property is used to provide the means by
 * >   which applications knowledgable in the given directory service
 * >   protocol can obtain additional or more up-to-date information from
 * >   the directory service. It contains a URI as defined in [RFC3986]
 * >   and/or other information referencing the vCard to which the
 * >   information pertains.  When directory information is available
 * >   from more than one source, the sending entity can pick what it
 * >   considers to be the best source, or multiple SOURCE properties can
 * >   be included.
 * >
 * > ABNF:
 * >   SOURCE-param = "VALUE=uri" / pid-param / pref-param / altid-param
 * >                / mediatype-param / any-param
 * >   SOURCE-value = URI
 * >
 * > Examples:
 * >   SOURCE:ldap://ldap.example.com/cn=Babs%20Jensen,%20o=Babsco,%20c=US
 * >
 * >   SOURCE:http://directory.example.com/addressbooks/jdoe/
 * >    Jean%20Dupont.vcf
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.1.3
 */
export default class SourceProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    parameters: SourceParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: SourceParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        SourceProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    toString() {
        return foldLine(`SOURCE${this.getParametersString()}:${this.valueOf()}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: SourcePropertyLike): SourceProperty {
        if (value instanceof SourceProperty) return value;

        if (Array.isArray(value)) return new SourceProperty(...value);

        if (isString(value)) return new SourceProperty(value);

        throw new TypeError(`The value "${value}" is not a SourcePropertyLike type`);
    }

    static validateParameters({ pref }: SourceParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
