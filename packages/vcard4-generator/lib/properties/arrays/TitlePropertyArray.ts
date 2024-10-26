import TitleProperty from '../TitleProperty.js';

export default class TitlePropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(TitleProperty.factory(item)));

        return this.length;
    }
}
