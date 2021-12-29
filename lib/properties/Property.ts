import kebabCase from 'lodash.kebabcase';
import escapePropertyValue from '../util/escape-property-value';

export default abstract class Property {
    abstract toString(): string;
    abstract valueOf(): unknown;

    readonly COMPONENT_SEPARATOR = ';';

    parameters: unknown;

    get hasParameters(): boolean {
        return Object.keys(this.parameters as Record<string, any>).length >= 1;
    }

    components(): string[] {
        return ((this.valueOf() as number | string).toString()).split(';');
    }

    getValue(): string {
        const value = this
            .components()
            .map(escapePropertyValue)
            .join(this.COMPONENT_SEPARATOR);

        return `:${value}`;
    }

    getValueWithParameters(): string {
        const getKeyValueString = ([key, value]: [string, any]) =>
            [kebabCase(key).toUpperCase(), Array.isArray(value) ? value.join(',') : value].join('=');
        const parameters = Object.entries(this.parameters as Record<string, any>)
            .map(getKeyValueString)
            .join(this.COMPONENT_SEPARATOR);
        const value = this.components()
            .map(escapePropertyValue)
            .join(this.COMPONENT_SEPARATOR);

        return `;${parameters}:${value}`;
    }
};
