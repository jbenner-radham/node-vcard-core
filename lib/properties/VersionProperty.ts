import { Cardinality } from '../types';
import Property from './Property';

const VALUE: unique symbol = Symbol.for('value');

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.9
 */
export default class VersionProperty implements Property {
    static readonly CARDINALITY: Cardinality = '1'; // Exactly one instance per vCard MUST be present.

    [VALUE]: number;

    constructor(value = 4) {
        this[VALUE] = value;
    }

    toString() {
        return `VERSION:${this.valueOf().toFixed(1)}`;
    }

    valueOf(): number {
        return this[VALUE];
    }
}
