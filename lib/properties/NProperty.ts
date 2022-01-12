import isPlainObject from 'lodash.isplainobject';
import { Cardinality } from '../types';
import foldLine from '../util/fold-line';
import getSemicolonCount from '../util/get-semicolon-count';
import Property from './Property';
import isString from '../util/is-string';

export interface NParameters {
    sortAs?: string;
    language?: string;
    altid?: number | string;
}

export interface NPropertyConfig {
    value: string;
    parameters?: NParameters;
}

export type NPropertyLike = NProperty | NPropertyConfig | string;

const VALUE: unique symbol = Symbol.for('value');

/**
 * > Purpose:  To specify the components of the name of the object the
 * >   vCard represents.
 * >
 * > Value type:  A single structured text value. Each component can have
 * >   multiple values.
 * >
 * > Special note:  The structured property value corresponds, in
 * >   sequence, to the Family Names (also known as surnames), Given
 * >   Names, Additional Names, Honorific Prefixes, and Honorific
 * >   Suffixes. The text components are separated by the SEMICOLON
 * >   character (U+003B). Individual text components can include
 * >   multiple text values separated by the COMMA character (U+002C).
 * >   This property is based on the semantics of the X.520 individual
 * >   name attributes [CCITT.X520.1988]. The property SHOULD be present
 * >   in the vCard object when the name of the object the vCard
 * >   represents follows the X.520 model.
 * >
 * >   The SORT-AS parameter MAY be applied to this property.
 * >
 * > ABNF:
 * >   N-param = "VALUE=text" / sort-as-param / language-param
 * >           / altid-param / any-param
 * >   N-value = list-component 4(";" list-component)
 * >
 * > Examples:
 * >   N:Public;John;Quinlan;Mr.;Esq.
 * >
 * >   N:Stevenson;John;Philip,Paul;Dr.;Jr.,M.D.,A.C.P.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.2
 */
export default class NProperty extends Property {
    static readonly CARDINALITY: Cardinality = '*1'; // Exactly one instance per vCard MAY be present.

    parameters: NParameters;

    [VALUE]: string;

    get familyName(): string {
        const [familyName = ''] = this.components();

        return familyName;
    }

    get givenName(): string {
        const [, givenName = ''] = this.components();

        return givenName;
    }

    get additionalName(): string {
        const [, , additionalName = ''] = this.components();

        return additionalName;
    }

    get honorificPrefix(): string {
        const [, , , honorificPrefix = ''] = this.components();

        return honorificPrefix;
    }

    get honorificSuffix(): string {
        const [, , , , honorificSuffix = ''] = this.components();

        return honorificSuffix;
    }

    constructor(config: NPropertyConfig | string) {
        super();

        if (isPlainObject(config)) {
            const { value, parameters = {} } = config as NPropertyConfig;
            this.parameters = parameters;
            this[VALUE] = value;

            return;
        }

        if (isString(config)) {
            this.parameters = {};
            this.validate(config);
            this[VALUE] = config;

            return;
        }

        throw new TypeError(`The value "${config}" is not a NPropertyConfig or string type`);
    }

    toString() {
        return foldLine(`N${this.getParametersString()}:${this.getEscapedValueString()}`);
    }

    valueOf(): string {
        return this[VALUE];
    }

    validate(value: string): void {
        const semicolonCount = getSemicolonCount(value);

        if (semicolonCount !== 4)
            throw new TypeError(`The value "${value}" is not a valid N format`);
    }

    static factory(value: NPropertyLike): NProperty {
        if (value instanceof NProperty) return value;

        if (isPlainObject(value) || isString(value)) return new NProperty(value);

        throw new TypeError(`The value "${value}" is not a NPropertyLike type`);
    }
}
