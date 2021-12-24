import TitleProperty from '../TitleProperty';

export default class TitlePropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(TitleProperty.factory(item)));

        return this.length;
    }
}
