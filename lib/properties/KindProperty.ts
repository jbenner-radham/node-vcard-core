import { Cardinality } from '../types';
import Property from './Property';

export type Kind = 'application' | 'group' | 'individual' | 'location' | 'org';

export type KindPropertyLike = KindProperty | Kind;

const VALUE: unique symbol = Symbol.for('value');

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.1.4
 * @see https://datatracker.ietf.org/doc/html/rfc6473
 */
export default class KindProperty implements Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    [VALUE]: string;

    constructor(value: Kind) {
        this[VALUE] = value;
    }

    toString() {
        return `KIND:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: KindPropertyLike): KindProperty {
        if (value instanceof KindProperty) return value;

        if (typeof value === 'string') return new KindProperty(value);

        throw new TypeError(`The value "${value}" is not a KindPropertyLike type`);
    }
}
