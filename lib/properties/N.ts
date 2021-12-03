import { Cardinality } from '../types';
import Property from './Property';

export interface NParameters {
    altid?: string;
    language?: string;
    sortAs?: string;
}

const VALUE: unique symbol = Symbol.for('value');

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.2
 */
export default class N implements Property {
    // Metadata
    cardinality: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

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

    valueOf() {
        return this[VALUE];
    }

    validate(value: string): void {
        const semicolonCount = [...value].reduce((accumulator, character) => {
            return (character === ';')
                ? accumulator + 1
                : accumulator;
        }, 0);

        if (semicolonCount !== 4)
            throw new TypeError(`The value "${value}" is not a valid N format`);
    }
}
