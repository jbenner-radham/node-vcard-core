import TitleProperty, { type TitleConfig } from '../TitleProperty.js';

export default class TitlePropertyArray extends Array {
    push(...items: TitleConfig[]): number {
        items.forEach(item => super.push(TitleProperty.from(item)));

        return this.length;
    }
}
