import escapePropertyValue from '../util/escape-property-value';

export default abstract class Property {
    abstract toString(): string;
    abstract valueOf(): unknown;

    readonly COMPONENT_SEPARATOR = ';';

    components(): string[] {
        return ((this.valueOf() as number | string).toString()).split(';');
    }

    escape(value: string): string {
        return escapePropertyValue(value);
    }
};
