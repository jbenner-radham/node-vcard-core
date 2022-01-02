import isPlainObject from 'lodash.isplainobject';
import { Cardinality } from '../types';
import Property from './Property';

export interface PhotoParameters {
    altid?: number | string;
    type?: 'home' | 'work' | string;
    mediatype?: string;
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    pid?: number | number[];
}

export interface PhotoPropertyConfig {
    value: string;
    parameters?: PhotoParameters;
}

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

    [VALUE]: string;

    constructor(config: PhotoPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as PhotoPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (typeof config === 'string') {
            this.parameters = {};
            this.validate(config);
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a PhotoPropertyConfig or string type`);
    }

    toString() {
        return `PHOTO${this.getParametersString()}:${this.getEscapedValueString()}`;
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

        if (typeof value === 'string') return new PhotoProperty(value);

        throw new TypeError(`The value "${value}" is not a PhotoPropertyLike type`);
    }
}
