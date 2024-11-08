import type { Altid, Cardinality, CommonParameters, Group, Pid, Pref, Options, Type, Value } from '../types.js';
import { getInvalidPidParameterMessage, getInvalidPrefParameterMessage } from '../util/error-messages.js';
import isString from '../util/is-string.js';
import isValidGroup from '../util/is-valid-group.js';
import isValidPidParameter from '../util/is-valid-pid-parameter.js';
import isValidPrefParameter from '../util/is-valid-pref-parameter.js';
import Property from './Property.js';

export type LangParameters = {
    value?: Extract<Value, 'language-tag'>;
    pid?: Pid;
    pref?: Pref;
    altid?: Altid;
    type?: Type;
} & CommonParameters;

export type LangRestConfig = [value: string, parameters?: LangParameters, options?: Options];

export type LangConfig = LangProperty | LangRestConfig | string;

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
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.4.4 RFC 6350 - vCard Format Specification § LANG}
 */
export default class LangProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*'; // One or more instances per vCard MAY be present.

    static readonly DEFAULT_VALUE_TYPE: Value = 'language-tag';

    group: Group;

    parameters: LangParameters = {};

    [VALUE]: string;

    constructor(value: string, parameters: LangParameters = {}, { group = '' }: Options = {}) {
        super();

        if (!isString(value))
            throw new TypeError(`The value "${value}" is not a string type`);

        if (!isValidGroup(group))
            throw new TypeError(`The group "${group}" is not a string or integer`);

        LangProperty.validateParameters(parameters);

        this.group = group;
        this.parameters = parameters;
        this[VALUE] = value;
    }

    valueOf(): string {
        return this[VALUE];
    }

    static from(value: LangConfig): LangProperty {
        if (value instanceof LangProperty) return value;

        if (Array.isArray(value)) return new LangProperty(...value);

        if (isString(value)) return new LangProperty(value);

        throw new TypeError(`The value "${value}" is not a LangConfig type`);
    }

    static validateParameters({ pid, pref }: LangParameters): void {
        if (pid !== undefined && !isValidPidParameter(pid)) {
            throw new TypeError(getInvalidPidParameterMessage({ pid }));
        }

        if (pref && !isValidPrefParameter(pref)) {
            throw new TypeError(getInvalidPrefParameterMessage({ pref }));
        }
    }
}
