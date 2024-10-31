export default function isString(value: unknown): value is number {
    return typeof value === 'number';
}
