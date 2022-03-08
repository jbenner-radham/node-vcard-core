import LangProperty from '../LangProperty';

export default class LangPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(LangProperty.factory(item)));

        return this.length;
    }
}
