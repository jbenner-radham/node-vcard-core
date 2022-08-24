import isString from './is-string';

export default function isValidGroup(value: any): boolean {
    return Number.isInteger(value) || isString(value);
}
