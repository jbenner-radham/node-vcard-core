import isPlainObject from 'lodash.isplainobject';
import { Cardinality, Value } from '../types';
import foldLine from '../util/fold-line';
import isString from '../util/is-string';
import Property from './Property';
import getSemicolonCount from '../util/get-semicolon-count';

export type Sex = '' | 'F' | 'M' | 'N' | 'O' | 'U';

export interface GenderParameters {
    value?: 'text';
}

export interface GenderPropertyConfig {
    value: string;
    parameters?: GenderParameters;
}

export type GenderPropertyLike = GenderProperty | GenderPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the components of the sex and gender identity of
 * >   the object the vCard represents.
 * >
 * > Value type:  A single structured value with two components. Each
 * >   component has a single text value.
 * >
 * > Special notes:  The components correspond, in sequence, to the sex
 * >   (biological), and gender identity.  Each component is optional.
 * >
 * >   Sex component:  A single letter.  M stands for "male", F stands
 * >     for "female", O stands for "other", N stands for "none or not
 * >     applicable", U stands for "unknown".
 * >
 * >   Gender identity component:  Free-form text.
 * >
 * > ABNF:
 * >   GENDER-param = "VALUE=text" / any-param
 * >   GENDER-value = sex [";" text]
 * >
 * >   sex = "" / "M" / "F" / "O" / "N" / "U"
 * >
 * > Examples:
 * >   GENDER:M
 * >   GENDER:F
 * >   GENDER:M;Fellow
 * >   GENDER:F;grrrl
 * >   GENDER:O;intersex
 * >   GENDER:;it's complicated
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.7
 */
export default class GenderProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    parameters: GenderParameters = {};

    [VALUE]: string;

    get sex(): Sex {
        const [sex = ''] = this.components() as Sex[];

        return sex;
    }

    get genderIdentity(): string {
        const [, genderIdentity = ''] = this.components();

        return genderIdentity;
    }

    #objectConstructor(config: GenderPropertyConfig) {
        const { value, parameters = {} } = config;
        this.parameters = parameters;
        this[VALUE] = value;

        return this;
    }

    #stringConstructor(value: string) {
        this[VALUE] = value;

        return this;
    }

    constructor(config: GenderPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            return this.#objectConstructor(config as GenderPropertyConfig);
        }

        if (isString(config)) {
            return this.#stringConstructor(config);
        }

        throw new TypeError(`The value "${config}" is not a GenderPropertyConfig or string type`);
    }

    toString() {
        const parameters = this.getParametersString();
        const value = this.getEscapedValueString();

        return foldLine(`GENDER${parameters}:${value}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    validate(value: string): void {
        const semicolonCount = getSemicolonCount(value);

        // If only a "sex" component is passed no semicolons will be present
        // which is valid syntax.
        if (semicolonCount === 0) return;

        // If both a "sex" and "gender" component are passed then one semicolon
        // should be present.
        if (semicolonCount !== 1)
            throw new TypeError(`The value "${value}" is not a valid GENDER format`);
    }

    static factory(value: GenderPropertyLike): GenderProperty {
        if (value instanceof GenderProperty) return value;

        if (isPlainObject(value) || isString(value)) return new GenderProperty(value);

        throw new TypeError(`The value "${value}" is not a GenderPropertyLike type`);
    }
}
