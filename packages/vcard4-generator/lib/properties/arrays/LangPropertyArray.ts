import LangProperty, { type LangConfig } from '../LangProperty.js';

export default class LangPropertyArray extends Array {
    push(...items: LangConfig[]): number {
        items.forEach(item => super.push(LangProperty.from(item)));

        return this.length;
    }
}
