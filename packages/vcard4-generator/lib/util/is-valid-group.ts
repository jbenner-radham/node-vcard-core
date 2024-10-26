import isString from './is-string.js';

export default function isValidGroup(value: any): boolean {
    return Number.isInteger(value) || isString(value);
}
