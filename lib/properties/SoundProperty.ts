import isPlainObject from 'lodash.isplainobject';
import isString from '../util/is-string';
import { Cardinality } from '../types';
import Property from './Property';

export interface SoundParameters {
    language?: string;
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: 'home' | 'work' | string;
    mediatype?: string;
    altid?: number | string;
}

export interface SoundPropertyConfig {
    value: string;
    parameters?: SoundParameters;
}

/** @todo Add URL type support. */
export type SoundPropertyLike = SoundProperty | SoundPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify a digital sound content information that
 * >   annotates some aspect of the vCard. This property is often used
 * >   to specify the proper pronunciation of the name property value of
 * >   the vCard.
 * >
 * > Value type:  A single URI.
 * >
 * > ABNF:
 * >   SOUND-param = "VALUE=uri" / language-param / pid-param / pref-param
 * >               / type-param / mediatype-param / altid-param
 * >               / any-param
 * >   SOUND-value = URI
 * >
 * > Example _(sic)_:
 * >   SOUND:CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com
 * >
 * >   SOUND:data:audio/basic;base64,MIICajCCAdOgAwIBAgICBEUwDQYJKoZIh
 * >    AQEEBQAwdzELMAkGA1UEBhMCVVMxLDAqBgNVBAoTI05ldHNjYXBlIENvbW11bm
 * >    ljYXRpb25zIENvcnBvcmF0aW9uMRwwGgYDVQQLExNJbmZvcm1hdGlvbiBTeXN0
 * >    <...the remainder of base64-encoded data...>
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.5
 */
export default class SoundProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(config: SoundPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as SoundPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (typeof config === 'string') {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a SoundPropertyConfig or string type`);
    }

    toString() {
        return `SOUND${this.getParametersString()}:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: SoundPropertyLike): SoundProperty {
        if (value instanceof SoundProperty) return value;

        if (isPlainObject(value) || isString(value)) return new SoundProperty(value);

        throw new TypeError(`The value "${value}" is not a SoundPropertyLike type`);
    }
}
