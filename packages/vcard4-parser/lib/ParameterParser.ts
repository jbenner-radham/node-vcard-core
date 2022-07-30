import * as os from 'os';
import type { Parameter, Property } from './types';
import { PARAMETER_ALLOWLISTS } from './allowlists';

export default class ParameterParser {
    #parameter: string;

    name: Parameter;

    value: string;

    constructor(parameter = '') {
        this.#parameter = parameter;
        this.name = this.getName();
        this.value = this.getDecodedValue();
    }

    /**
     * @see https://datatracker.ietf.org/doc/html/rfc6868
     */
    getDecodedValue(): string {
        const value = this.getRawValue();
        const isQuoted = /^".+"$/s.test(value);
        const quote = (value: string) => `"${value}"`;
        const unquote = (value: string) => value.replace(/^"/s, '').replace(/"$/s, '');
        const unquotedValue = isQuoted ? unquote(value) : value;
        const decodedValue = unquotedValue
            .replaceAll(`^'`, '"')
            .replaceAll('^n', os.EOL) /** @todo Make this browser compatible. */
            .replaceAll('^^', '^');

        return isQuoted ? quote(decodedValue) : decodedValue;
    }

    getName(): Parameter {
        const [name = ''] = this.#parameter.split('=');

        return name.toUpperCase() as Parameter;
    }

    getRawValue(): string {
        const [, value = ''] = this.#parameter.split('=');

        return value;
    }

    /**
     * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5
     */
    isAllowedFor(property: Property): boolean {
        const isAllowed = PARAMETER_ALLOWLISTS[property].has(this.name);

        if (!isAllowed) {
            console.warn(`"${this.name}" is not a valid parameter of ${property}`);
        }

        return isAllowed;
    }
}
