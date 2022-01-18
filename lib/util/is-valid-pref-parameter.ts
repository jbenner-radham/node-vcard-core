export default function isValidPrefParameter(value: any): boolean {
    // > Its value MUST be an integer between 1 and 100 that quantifies the
    // > level of preference.
    return (Number.isInteger(value) && value >= 1 && value <= 100);
}
