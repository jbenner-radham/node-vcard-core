export default abstract class Property {
    abstract toString(): string;
    abstract valueOf(): unknown;

    components(): string[] {
        return ((this.valueOf() as number | string).toString()).split(';');
    }

    escape(value: string): string {
        /**
         * PROTIP: The order of this chain is very important!
         * @see https://datatracker.ietf.org/doc/html/rfc6350#section-3.4
         */
        return value
            .replaceAll('\\', '\\\\')
            .replaceAll(',', '\\,')
            .replaceAll(';', '\\;')
            .replaceAll('\n', '\\n');
    }
};
