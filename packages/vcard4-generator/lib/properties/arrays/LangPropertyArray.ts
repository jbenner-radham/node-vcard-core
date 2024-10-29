import LangProperty, { type LangPropertyLike } from '../LangProperty.js';

export default class LangPropertyArray extends Array {
    push(...items: LangPropertyLike[]): number {
        items.forEach(item => super.push(LangProperty.factory(item)));

        return this.length;
    }
}
