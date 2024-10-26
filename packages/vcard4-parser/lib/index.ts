import { EOL, FOLD_CONTINUATION_CHARS } from '@vcard/vcard4-meta';
import PropertyParser from './PropertyParser.js';

export default class Vcard4Parser {
    #index: number;

    #lines: string[];

    #vcard: string;

    properties: PropertyParser[];

    constructor(vcard: string) {
        this.#index = 0;
        this.#vcard = vcard;
        this.#lines = this.#vcard.trim().split(EOL);
        this.properties = this.#getProperties();
    }

    static isLineFolded(line: string): boolean {
        return FOLD_CONTINUATION_CHARS.includes(line.charAt(0));
    }

    #getProperties(): PropertyParser[] {
        this.#index = 0;
        const properties = [];

        while (this.#index < this.#lines.length) {
            const line = this.#lines[this.#index];

            if (this.#index === 0 && Vcard4Parser.isLineFolded(line)) {
                throw Error('The first line of a vCard cannot be folded e.g., begin with a space or tab');
            }

            const propertyIndices = this.#getPropertyIndices();
            const nextIndex = propertyIndices.at(-1)! + 1;

            const property = this.#slicePropertyTo(nextIndex);

            properties.push(new PropertyParser(property));

            this.#index = nextIndex;
        }

        return properties.filter(property => property.isAllowed());
    }

    #getPropertyIndices(): number[] {
        if (!this.#propertyIsMultiline()) {
            return [this.#index];
        }

        const indices = [this.#index];
        let nextIndex = this.#index + 1;
        let nextLine = this.#lines[nextIndex];

        while (Vcard4Parser.isLineFolded(nextLine)) {
            indices.push(nextIndex++);
            nextLine = this.#lines[nextIndex];
        }

        return indices;
    }

    #propertyIsMultiline(): boolean {
        // If it's the last line it can't be multiline.
        if (this.#index === this.#lines.length - 1) {
            return false;
        }

        const nextLine = this.#lines[this.#index + 1];

        return Vcard4Parser.isLineFolded(nextLine);
    }

    #slicePropertyTo(exclusiveIndex: number): string {
        return this.#lines.slice(this.#index, exclusiveIndex)
            .map(line => line.trim())
            .join('');
    }
}
