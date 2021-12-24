import { Cardinality } from '../types';
import Property from './Property';

export type NicknamePropertyLike = NicknameProperty | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the text corresponding to the nickname of the object the vCard represents.
 * >
 * > Value type:  One or more text values separated by a COMMA character (U+002C).
 * >
 * > Special note:  The nickname is the descriptive name given instead of or in addition to the one
 * >   belonging to the object the vCard represents. It can also be used to specify a familiar form
 * >   of a proper name specified by the FN or N properties.
 * >
 * > ABNF:
 * >   NICKNAME-param = "VALUE=text" / type-param / language-param
 * >                  / altid-param / pid-param / pref-param / any-param
 * >   NICKNAME-value = text-list
 * >
 * > Examples:
 * >   NICKNAME:Robbie
 * >   NICKNAME:Jim,Jimmie
 * >   NICKNAME;TYPE=work:Boss
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.3
 */
export default class NicknameProperty implements Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    [VALUE]: string;

    constructor(value: string) {
        this[VALUE] = value;
    }

    toString() {
        return `NICKNAME:${this.valueOf()}`;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static factory(value: NicknamePropertyLike): NicknameProperty {
        if (value instanceof NicknameProperty) return value;

        if (typeof value === 'string') return new NicknameProperty(value);

        throw new TypeError(`The value "${value}" is not a NicknamePropertyLike type`);
    }
}
