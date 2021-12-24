import { Cardinality } from '../types';
import Property from './Property';
import getSemicolonCount from '../get-semicolon-count';

export type Sex = '' | 'F' | 'M' | 'N' | 'O' | 'U';

export type GenderPropertyLike = GenderProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.7
 */
export default class GenderProperty implements Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    [VALUE]: string;

    get sex(): Sex {
        const [sex = ''] = this.components() as Sex[];

        return sex;
    }

    get genderIdentity(): string {
        const [, genderIdentity = ''] = this.components();

        return genderIdentity;
    }

    constructor(value: string) {
        this[VALUE] = value;
    }

    components(): string[] {
        return this.valueOf().split(';');
    }

    toString() {
        return `GENDER:${this.valueOf()}`;
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

        if (typeof value === 'string') return new GenderProperty(value);

        throw new TypeError(`The value "${value}" is not a GenderPropertyLike type`);
    }
}
