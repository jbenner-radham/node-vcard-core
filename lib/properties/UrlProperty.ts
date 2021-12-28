import { Cardinality } from '../types';
import Property from './Property';

/** @todo Add URL type support. */
export type UrlPropertyLike = UrlProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.8
 */
export default class UrlProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(value: string) {
        super();
        this.validate(value);
        this[VALUE] = value;
    }

    toString() {
        return `URL:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    validate(value: string): void {
        try {
            new URL(value);
        } catch (_) {
            throw new TypeError(`The value "${value}" is not a valid URL format`);
        }
    }

    static factory(value: UrlPropertyLike): UrlProperty {
        if (value instanceof UrlProperty) return value;

        if (typeof value === 'string') return new UrlProperty(value);

        throw new TypeError(`The value "${value}" is not a UrlPropertyLike type`);
    }
}
