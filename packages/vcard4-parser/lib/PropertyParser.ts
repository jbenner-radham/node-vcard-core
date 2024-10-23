import camelCase from 'lodash.camelcase';
import { SEPARATOR } from '@vcard/vcard4-meta';
import type { Parameters, Property } from './types';
import ParameterParser from './ParameterParser';
import { PROPERTY_ALLOWLIST } from './allowlists';

export default class PropertyParser {
    #colonIndex: number;

    #property: string;

    name: Property;

    parameters: Parameters;

    value: string;

    constructor(property = '') {
        this.#property = property;

        const colonIndex = this.getUnquotedColonIndex();

        if (colonIndex === -1) {
            // Handle error...
        }

        this.#colonIndex = colonIndex;
        this.name = this.getName();
        this.parameters = this.getParameters();
        this.value = this.getUnescapedValue();
    }

    getName(): Property {
        const nameAndMaybeParameters = this.#property.slice(0, this.#colonIndex);
        const hasParameters = () => nameAndMaybeParameters.includes(SEPARATOR);

        if (!hasParameters()) {
            return nameAndMaybeParameters as Property;
        }

        const firstSeparatorIndex = nameAndMaybeParameters.indexOf(SEPARATOR);

        return nameAndMaybeParameters.slice(0, firstSeparatorIndex) as Property;
    }

    getParameters(): Parameters {
        const nameAndMaybeParameters = this.#property.slice(0, this.#colonIndex);
        const hasParameters = () => nameAndMaybeParameters.includes(SEPARATOR);

        if (!hasParameters()) {
            return {};
        }

        const firstSeparatorIndex = nameAndMaybeParameters.indexOf(SEPARATOR);

        return nameAndMaybeParameters
            .slice(firstSeparatorIndex + 1)
            .split(SEPARATOR)
            .map(parameter => new ParameterParser(parameter))
            .filter(parameter => parameter.isAllowedFor(this.name))
            .reduce((accumulator, parameter) => ({
                ...accumulator, [camelCase(parameter.name)]: parameter.value
            }), {});
    }

    getRawValue(): string {
        return this.#property.slice(this.#colonIndex + 1);
    }

    /**
     * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-3.4 RFC 6350 - vCard Format Specification § Property Value Escaping}
     */
    getUnescapedValue(): string {
        return this.getRawValue()
            .replaceAll('\\,', ',')
            .replaceAll('\\;', ';')
            .replaceAll('\\n', '\n')
            .replaceAll('\\\\', '\\');
    }

    getUnquotedColonIndex(): number {
        let inQuote = false;

        for (let index = 0; index < this.#property.length; ++index) {
            const char = this.#property[index];

            if (char === '"') {
                inQuote = !inQuote;
            }

            if (char === ':' && inQuote) {
                continue;
            }

            if (char === ':' && !inQuote) {
                return index;
            }
        }

        return -1;
    }

    /**
     * @see {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.10 RFC 6350 - vCard Format Specification § Extended Properties and Parameters}
     */
    isAllowed(): boolean {
        const isAllowed = PROPERTY_ALLOWLIST.has(this.name);

        if (!isAllowed) {
            console.warn(`"${this.name}" is not a valid property`);
        }

        return isAllowed;
    }
}
