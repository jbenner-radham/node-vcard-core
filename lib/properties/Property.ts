import kebabCase from 'lodash.kebabcase';
import escapePropertyValue from '../util/escape-property-value';

export default abstract class Property {
    abstract toString(): string;
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
        return ((this.valueOf() as number | string).toString()).split(this.COMPONENT_SEPARATOR);
    }

    getParametersString(): string {
        const formatKey = (key: string): string => kebabCase(key).toUpperCase();
        const joinIfArray = (value: any): any => Array.isArray(value) ? value.join(',') : value;
        const getKeyValueString = ([key, value]: [string, any]) => [formatKey(key), joinIfArray(value)].join('=');
        const parameters = Object.entries(this.parameters as Record<string, any> ?? {})
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

    getValue(): string {
        const value = this
            .components()
            .map(escapePropertyValue)
            .join(this.COMPONENT_SEPARATOR);

        return `:${value}`;
    }

    getValueWithParameters(): string {
        const formatKey = (key: string): string => kebabCase(key).toUpperCase();
        const joinIfArray = (value: any): any => Array.isArray(value) ? value.join(',') : value;
        const getKeyValueString = ([key, value]: [string, any]) => [formatKey(key), joinIfArray(value)].join('=');
        const parameters = Object.entries(this.parameters as Record<string, any>)
            .map(getKeyValueString)
            .join(this.COMPONENT_SEPARATOR);
        const value = this.components()
            .map(escapePropertyValue)
            .join(this.COMPONENT_SEPARATOR);

        return `;${parameters}:${value}`;
    }
};
