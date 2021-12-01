import { Cardinality } from '../types';
import Property from './Property';

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.9
 */
export default class Version implements Property {
    // Metadata
    cardinality: Cardinality = '1'; // Exactly one instance per vCard MUST be present.

    constructor(value: number = 4) {
        (this as any)[Symbol.for('value')] = value;
    }

    toString() {
        return `VERSION:${this.valueOf().toFixed(1)}`;
    }

    valueOf() {
        return (this as any)[Symbol.for('value')];
    }
}
