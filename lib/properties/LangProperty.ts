import { Cardinality } from '../types';
import Property from './Property';

export type LangPropertyLike = LangProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the language(s) that may be used for contacting
 * >   the entity associated with the vCard.
 * >
 * > Value type:  A single language-tag value.
 * >
 * > ABNF:
 * >   LANG-param = "VALUE=language-tag" / pid-param / pref-param
 * >              / altid-param / type-param / any-param
 * >   LANG-value = Language-Tag
 * >
 * > Example:
 * >   LANG;TYPE=work;PREF=1:en
 * >   LANG;TYPE=work;PREF=2:fr
 * >   LANG;TYPE=home:fr
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.4.4
 */
export default class LangProperty implements Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(value: string) {
        this[VALUE] = value;
    }

    toString() {
        return `LANG:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: LangPropertyLike): LangProperty {
        if (value instanceof LangProperty) return value;

        if (typeof value === 'string') return new LangProperty(value);

        throw new TypeError(`The value "${value}" is not a LangPropertyLike type`);
    }
}
