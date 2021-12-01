import { Cardinality } from '../types';
import Property from './Property';

export interface FnParameters {
    altid?: string;
    language?: string;
    pid?: string;
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: 'home' | 'work';
}

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.1
 */
export default class Fn implements Property {
    // Metadata
    cardinality: Cardinality = '1*'; // One or more instances per vCard MUST be present.

    parameters?: FnParameters;

    constructor(value: string) {
        (this as any)[Symbol.for('value')] = value;
    }

    toString() {
        return `FN:${this.valueOf()}`;
    }

    valueOf() {
        return (this as any)[Symbol.for('value')];
    }
}
