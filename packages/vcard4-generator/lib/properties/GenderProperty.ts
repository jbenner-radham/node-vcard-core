import type { Cardinality, Group, PropertyOptions, Value } from '../types.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import Property from './Property.js';
import getUnescapedSemicolonCount from '../util/get-unescaped-semicolon-count.js';

export type Sex = '' | 'F' | 'M' | 'N' | 'O' | 'U';

export interface GenderParameters {
    value?: 'text';
}

export type GenderPropertyRestConfig = [value: string, parameters?: GenderParameters, options?: PropertyOptions];

export type GenderPropertyLike = GenderProperty | GenderPropertyRestConfig | string;

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
 * >   GENDER:M;Transgender Man
 * >   GENDER:F;Transfeminine
 * >   GENDER:O;Intersex
 * >   GENDER:;Agender
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.7 RFC 6350 - vCard Format Specification § GENDER}
 * @see {@link https://www.rfc-editor.org/errata/eid6812 RFC Errata Report » RFC Editor}
 */
export default class GenderProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'text';

    group: Group;

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

    constructor(value: string, parameters: GenderParameters = {}, { group = '' }: PropertyOptions = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    validate(value: string): void {
        const semicolonCount = getUnescapedSemicolonCount(value);

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

        if (Array.isArray(value)) return new GenderProperty(...value);

        if (isString(value)) return new GenderProperty(value);

        throw new TypeError(`The value "${value}" is not a GenderPropertyLike type`);
    }
}
