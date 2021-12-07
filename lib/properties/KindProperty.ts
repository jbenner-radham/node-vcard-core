import { Cardinality } from '../types';
import Property from './Property';

export type Kind = 'application' | 'group' | 'individual' | 'location' | 'org';

const VALUE: unique symbol = Symbol.for('value');

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.1.4
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
}
