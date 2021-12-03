import { Cardinality } from '../types';
import Property from './Property';

export type KindType = 'application' | 'individual' | 'group' | 'org' | 'location';

const VALUE: unique symbol = Symbol.for('value');

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.1.4
 */
export default class Kind implements Property {
    // Metadata
    cardinality: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    [VALUE]: string;

    constructor(value: KindType) {
        this[VALUE] = value;
    }

    toString() {
        return `KIND:${this.valueOf()}`;
    }

    valueOf() {
        return this[VALUE];
    }
}
