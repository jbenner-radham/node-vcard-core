import isPlainObject from 'lodash.isplainobject';
import { Cardinality, Value } from '../types';
import foldLine from '../util/fold-line';
import { getInvalidPrefParameterMessage } from '../util/error-messages';
import isString from '../util/is-string';
import isValidPrefParameter from '../util/is-valid-pref-parameter';
import Property from './Property';

export interface TitleParameters {
    value?: 'text';
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

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    parameters: TitleParameters = {};

    [VALUE]: string;

    #objectConstructor(config: TitlePropertyConfig) {
        const { value, parameters = {} } = config;

        TitleProperty.validateParameters(parameters);

        this.parameters = parameters;
        this[VALUE] = value;

        return this;
    }

    #stringConstructor(value: string) {
        this[VALUE] = value;

        return this;
    }

    constructor(config: TitlePropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            return this.#objectConstructor(config as TitlePropertyConfig);
        }

        if (isString(config)) {
            return this.#stringConstructor(config);
        }

        throw new TypeError(`The value "${config}" is not a TitlePropertyConfig or string type`);
    }

    toString() {
        return foldLine(`TITLE${this.getParametersString()}:${this.getEscapedValueString()}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: TitlePropertyLike): TitleProperty {
        if (value instanceof TitleProperty) return value;

        if (isPlainObject(value) || isString(value)) return new TitleProperty(value);

        throw new TypeError(`The value "${value}" is not a TitlePropertyLike type`);
    }

    static validateParameters({ pref }: TitleParameters): void {
        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
