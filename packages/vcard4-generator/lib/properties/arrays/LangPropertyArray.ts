import LangProperty from '../LangProperty.js';

export default class LangPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(LangProperty.factory(item)));

        return this.length;
    }
}
