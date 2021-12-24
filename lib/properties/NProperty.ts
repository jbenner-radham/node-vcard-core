import { Cardinality } from '../types';
import Property from './Property';
import getSemicolonCount from '../get-semicolon-count';

export interface NParameters {
    altid?: string;
    language?: string;
    sortAs?: string;
}

export type NPropertyLike = NProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.2
 */
export default class NProperty implements Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    parameters?: NParameters;

    [VALUE]: string;

    get familyName(): string {
        const [familyName = ''] = this.components();

        return familyName;
    }

    get givenName(): string {
        const [, givenName = ''] = this.components();

        return givenName;
    }

    get additionalName(): string {
        const [, , additionalName = ''] = this.components();

        return additionalName;
    }

    get honorificPrefix(): string {
        const [, , , honorificPrefix = ''] = this.components();

        return honorificPrefix;
    }

    get honorificSuffix(): string {
        const [, , , , honorificSuffix = ''] = this.components();

        return honorificSuffix;
    }

    constructor(value: string) {
        this.validate(value);
        this[VALUE] = value;
    }

    components(): string[] {
        return this.valueOf().split(';');
    }

    toString() {
        return `N:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    validate(value: string): void {
        const semicolonCount = getSemicolonCount(value);

        if (semicolonCount !== 4)
            throw new TypeError(`The value "${value}" is not a valid N format`);
    }

    static factory(value: NPropertyLike): NProperty {
        if (value instanceof NProperty) return value;

        if (typeof value === 'string') return new NProperty(value);

        throw new TypeError(`The value "${value}" is not a NPropertyLike type`);
    }
}
