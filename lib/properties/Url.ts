import { Cardinality } from '../types';
import Property from './Property';

const VALUE: unique symbol = Symbol.for('value');

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.7.8
 */
export default class Url implements Property {
    // Metadata
    cardinality: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(value: string) {
        this[VALUE] = value;
    }

    toString() {
        return `URL:${this.valueOf()}`;
    }

    valueOf() {
        return this[VALUE];
    }
}
