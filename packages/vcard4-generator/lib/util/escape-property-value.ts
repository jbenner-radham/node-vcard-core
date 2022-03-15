export default function escapePropertyValue(value: string): string {
    /**
     * NOTE: The order of this chain is very important!
     * @see https://datatracker.ietf.org/doc/html/rfc6350#section-3.4
     */
    return value
        .replaceAll('\\', '\\\\')
        .replaceAll(',', '\\,')
        .replaceAll(';', '\\;')
        .replaceAll('\n', '\\n');
}
