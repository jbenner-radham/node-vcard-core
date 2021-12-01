import { Cardinality } from '../types';
import Property from './Property';

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.8
 */
export default class Url implements Property {
    // Metadata
    cardinality: Cardinality = '*'; // One or more instances per vCard MAY be present.

    constructor(value: string) {
        (this as any)[Symbol.for('value')] = value;
    }

    toString() {
        return `URL:${this.valueOf()}`;
    }

    valueOf() {
        return (this as any)[Symbol.for('value')];
    }
}
