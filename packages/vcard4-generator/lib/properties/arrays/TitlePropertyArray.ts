import TitleProperty, { type TitlePropertyLike } from '../TitleProperty.js';

export default class TitlePropertyArray extends Array {
    push(...items: TitlePropertyLike[]): number {
        items.forEach(item => super.push(TitleProperty.factory(item)));

        return this.length;
    }
}
