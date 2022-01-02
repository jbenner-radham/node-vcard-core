import isPlainObject from 'lodash.isplainobject';
import isString from '../util/is-string';
import { Cardinality } from '../types';
import Property from './Property';

export interface TitleParameters {
    pid?: number | number[];
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    altid?: number | string;
    mediatype?: string;
}

export interface TitlePropertyConfig {
    value: string;
    parameters?: TitleParameters;
}

export type TitlePropertyLike = TitleProperty | TitlePropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the position or job of the object the vCard
 * >   represents.
 * >
 * > Value type:  A single text value.
 * >
 * > Special notes:  This property is based on the X.520 Title attribute
 * >   [CCITT.X520.1988].
 * >
 * > ABNF:
 * >   TITLE-param = "VALUE=text" / language-param / pid-param
 * >               / pref-param / altid-param / type-param / any-param
 * >   TITLE-value = text
 * >
 * > Example:
 * >   TITLE:Research Scientist
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.6.1
 */
export default class TitleProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(config: TitlePropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as TitlePropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (typeof config === 'string') {
            this.parameters = {};
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a TitlePropertyConfig or string type`);
    }

    toString() {
        return `TITLE${this.getParametersString()}:${this.getEscapedValueString()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: TitlePropertyLike): TitleProperty {
        if (value instanceof TitleProperty) return value;

        if (isPlainObject(value) || isString(value)) return new TitleProperty(value);

        throw new TypeError(`The value "${value}" is not a TitlePropertyLike type`);
    }
}
