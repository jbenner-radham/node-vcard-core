import { Cardinality } from '../types';
import Property from './Property';

export type TitlePropertyLike = TitleProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the position or job of the object the vCard represents.
 * >
 * > Value type:  A single text value.
 * >
 * > Special notes:  This property is based on the X.520 Title attribute [CCITT.X520.1988].
 * >
 * > ABNF:
 * >   TITLE-param = "VALUE=text" / language-param / pid-param
 * >               / pref-param / altid-param / type-param / any-param
 * >   TITLE-value = text
 * >
 * > Example:
 * >   TITLE:Research Scientist
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.6.1
 */
export default class TitleProperty implements Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(value: string) {
        this[VALUE] = value;
    }

    toString() {
        return `TITLE:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: TitlePropertyLike): TitleProperty {
        if (value instanceof TitleProperty) return value;

        if (typeof value === 'string') return new TitleProperty(value);

        throw new TypeError(`The value "${value}" is not a TitlePropertyLike type`);
    }
}
