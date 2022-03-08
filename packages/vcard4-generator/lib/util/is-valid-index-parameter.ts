export default function isValidIndexParameter(value: any): boolean {
    // > INDEX values must be strictly positive. Zero is not allowed. _(integer)_
    return (Number.isInteger(value) && value >= 1);
}
