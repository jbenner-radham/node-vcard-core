export default abstract class Property {
    abstract toString(): string;
    abstract valueOf(): unknown;

    components(): string[] {
        return ((this.valueOf() as number | string).toString()).split(';');
    }
};
