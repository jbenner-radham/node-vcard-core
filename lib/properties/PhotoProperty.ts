import { Cardinality, Type, Value } from '../types';
import foldLine from '../util/fold-line';
import { getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export interface PhotoParameters {
    value?: 'uri';
    altid?: number | string;
    type?: Type;
    mediatype?: string;
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    pid?: number | number[];
}

export type PhotoPropertyConfig = [value: string, parameters?: PhotoParameters];

/** @todo Add URL type support. */
export type PhotoPropertyLike = PhotoProperty | PhotoPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify an image or photograph information that
 * >   annotates some aspect of the object the vCard represents.
 * >
 * > Value type:  A single URI.
 * >
 * > ABNF:
 * >   PHOTO-param = "VALUE=uri" / altid-param / type-param
 * >               / mediatype-param / pref-param / pid-param / any-param
 * >   PHOTO-value = URI
 * >
 * > Examples:
 * >   PHOTO:http://www.example.com/pub/photos/jqpublic.gif
 * >   PHOTO:data:image/jpeg;base64,MIICajCCAdOgAwIBAgICBEUwDQYJKoZIhv
 * >    AQEEBQAwdzELMAkGA1UEBhMCVVMxLDAqBgNVBAoTI05ldHNjYXBlIENvbW11bm
 * >    ljYXRpb25zIENvcnBvcmF0aW9uMRwwGgYDVQQLExNJbmZvcm1hdGlvbiBTeXN0
 * >    <...remainder of base64-encoded data...>
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.4
 */
export default class PhotoProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'uri';

    parameters: PhotoParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: PhotoParameters = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        PhotoProperty.validateParameters(parameters);
        this.validate(value);

        this.parameters = parameters;
        this[VALUE] = value;
    }

    toString() {
        return foldLine(`PHOTO${this.getParametersString()}:${this.valueOf()}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    validate(value: string): void {
        try {
            new URL(value);
        } catch (_) {
            throw new TypeError(`The value "${value}" is not a valid PHOTO format`);
        }
    }

    static factory(value: PhotoPropertyLike): PhotoProperty {
        if (value instanceof PhotoProperty) return value;

        if (Array.isArray(value)) return new PhotoProperty(...value);

        if (isString(value)) return new PhotoProperty(value);

        throw new TypeError(`The value "${value}" is not a PhotoPropertyLike type`);
    }

    static validateParameters({ pref }: PhotoParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
