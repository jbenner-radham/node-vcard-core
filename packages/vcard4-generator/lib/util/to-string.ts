export type Stringable = {
    toString: () => string;
};

export default function toString(value: Stringable): string {
    return value.toString();
}
