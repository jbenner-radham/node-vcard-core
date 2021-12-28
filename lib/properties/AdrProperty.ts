import { Cardinality } from '../types';
import Property from './Property';
import getSemicolonCount from '../util/get-semicolon-count';

export interface AdrParameters {
    altid?: string;
    geo?: string;
    label?: string;
    language?: string;
    pid?: string;
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: 'home' | 'work';
    tz?: string;
}

export type AdrPropertyLike = AdrProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.3.1
 */
export default class AdrProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    parameters?: AdrParameters;

    [VALUE]: string;

    get postOfficeBox(): string {
        const [postOfficeBox = ''] = this.components();

        return postOfficeBox;
    }

    get extendedAddress(): string {
        const [, extendedAddress = ''] = this.components();

        return extendedAddress;
    }

    get streetAddress(): string {
        const [, , streetAddress = ''] = this.components();

        return streetAddress;
    }

    get locality(): string {
        const [, , , locality = ''] = this.components();

        return locality;
    }

    get region(): string {
        const [, , , , region = ''] = this.components();

        return region;
    }

    get postalCode(): string {
        const [, , , , , postalCode = ''] = this.components();

        return postalCode;
    }

    get countryName(): string {
        const [, , , , , , countryName = ''] = this.components();

        return countryName;
    }

    constructor(value: string) {
        super();
        this.validate(value);
        this[VALUE] = value;
    }

    toString() {
        return `ADR:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    validate(value: string): void {
        const semicolonCount = getSemicolonCount(value);

        if (semicolonCount !== 6)
            throw new TypeError(`The value "${value}" is not a valid ADR format`);
    }

    static factory(value: AdrPropertyLike): AdrProperty {
        if (value instanceof AdrProperty) return value;

        if (typeof value === 'string') return new AdrProperty(value);

        throw new TypeError(`The value "${value}" is not a AdrPropertyLike type`);
    }
}
