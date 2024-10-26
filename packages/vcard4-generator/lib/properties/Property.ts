import { SEPARATOR } from '@vcard/vcard4-meta';
import encodeParameterValue from '../util/encode-parameter-value.js';
import escapePropertyValue from '../util/escape-property-value.js';
import foldLine from '../util/fold-line.js';
import isString from '../util/is-string.js';
import kebabCase from 'lodash.kebabcase';

export default abstract class Property {
    abstract valueOf(): unknown;

    group: unknown;

    parameters: unknown;

    get hasParameters(): boolean {
        return (
            typeof this.parameters !== 'undefined' &&
            Object.keys(this.parameters as Record<string, any>).length >= 1
        );
    }

    components(): string[] {
        /** @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-3.4 RFC 6350 - vCard Format Specification § Property Value Escaping} */
        const separatorMatcher = new RegExp(`(?<!\\\\)${SEPARATOR}`);

        return (this.valueOf() as number | string).toString().split(separatorMatcher);
    }

    getParametersString(): string {
        const formatKey = (key: string): string => kebabCase(key).toUpperCase();
        const joinIfArray = (value: any): any => Array.isArray(value) ? value.join(',') : value;
        const maybeQuote = (value: any): any => isString(value) && value.includes(',') ? `"${value}"` : value;
        const getKeyValueString = ([key, value]: [string, number | number[] | string]) =>
            `${formatKey(key)}=${encodeParameterValue(maybeQuote(joinIfArray(value)))}`;
        const parameters = Object.entries(this.parameters as Record<string, number | number[] | string> ?? {})
            .map(getKeyValueString)
            .join(SEPARATOR);

        return (parameters.length === 0) ? '' : `${SEPARATOR}${parameters}`;
    }

    getEscapedValueString(): string {
        return this
            .components()
            .map(escapePropertyValue)
            .join(SEPARATOR);
    }

    toString(): string {
        const group = this.group ? `${this.group}.`.toUpperCase() : '';
        const name = kebabCase(this.constructor.name.replace(/Property$/, '')).toUpperCase();
        const parameters = this.getParametersString();
        const value = this.getEscapedValueString();

        return foldLine(`${group}${name}${parameters}:${value}`);
    }
};
