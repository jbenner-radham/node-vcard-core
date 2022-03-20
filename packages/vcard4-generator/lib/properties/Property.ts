import encodeParameterValue from '../util/encode-parameter-value';
import escapePropertyValue from '../util/escape-property-value';
import foldLine from '../util/fold-line';
import isString from '../util/is-string';
import kebabCase from 'lodash.kebabcase';

export default abstract class Property {
    abstract valueOf(): unknown;

    readonly COMPONENT_SEPARATOR = ';';

    parameters: unknown;

    get hasParameters(): boolean {
        return (
            typeof this.parameters !== 'undefined' &&
            Object.keys(this.parameters as Record<string, any>).length >= 1
        );
    }

    components(): string[] {
        return (this.valueOf() as number | string).toString().split(this.COMPONENT_SEPARATOR);
    }

    getParametersString(): string {
        const formatKey = (key: string): string => kebabCase(key).toUpperCase();
        const joinIfArray = (value: any): any => Array.isArray(value) ? value.join(',') : value;
        const maybeQuote = (value: any): any => isString(value) && value.includes(',') ? `"${value}"` : value;
        const getKeyValueString = ([key, value]: [string, number | number[] | string]) =>
            `${formatKey(key)}=${encodeParameterValue(maybeQuote(joinIfArray(value)))}`;
        const parameters = Object.entries(this.parameters as Record<string, number | number[] | string> ?? {})
            .map(getKeyValueString)
            .join(this.COMPONENT_SEPARATOR);

        return (parameters.length === 0) ? '' : `${this.COMPONENT_SEPARATOR}${parameters}`;
    }

    getEscapedValueString(): string {
        return this
            .components()
            .map(escapePropertyValue)
            .join(this.COMPONENT_SEPARATOR);
    }

    toString(): string {
        const name = kebabCase(this.constructor.name.replace(/Property$/, '')).toUpperCase();
        const parameters = this.getParametersString();
        const value = this.getEscapedValueString();

        return foldLine(`${name}${parameters}:${value}`);
    }
};
