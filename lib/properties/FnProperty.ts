import { Cardinality } from '../types';
import Property from './Property';

export interface FnParameters {
    altid?: string;
    language?: string;
    pid?: string;
    pref?: number; // > Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
    type?: 'home' | 'work';
}

export type FnPropertyLike = FnProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.1
 */
export default class FnProperty extends Property {
    static readonly CARDINALITY: Cardinality = '1*'; // One or more instances per vCard MUST be present.

    parameters?: FnParameters;

    [VALUE]: string;

    constructor(value: string) {
        super();
        this[VALUE] = value;
    }

    toString() {
        return `FN:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: FnPropertyLike): FnProperty {
        if (value instanceof FnProperty) return value;

        if (typeof value === 'string') return new FnProperty(value);

        throw new TypeError(`The value "${value}" is not a FnPropertyLike type`);
    }
}
