/**
 * @see https://datatracker.ietf.org/doc/html/rfc6868
 */
export default function encodeParameterValue(value: number | string): string {
    const stringValue = value.toString();
    const isQuoted = /^".+"$/s.test(stringValue);
    const quote = (value: string) => `"${value}"`;
    const unquote = (value: string) => value.replace(/^"/s, '').replace(/"$/s, '');
    const unquotedValue = isQuoted ? unquote(stringValue) : stringValue;
    const encodedValue = unquotedValue
        .replaceAll('^', '^^')
        .replaceAll(/\r\n|\n/g, '^n')
        .replaceAll('"', `^'`);

    return isQuoted ? quote(encodedValue) : encodedValue;
}
