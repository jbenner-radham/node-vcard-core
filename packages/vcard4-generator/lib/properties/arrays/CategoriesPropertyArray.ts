import CategoriesProperty, { type CategoriesPropertyLike } from '../CategoriesProperty.js';

export default class CategoriesPropertyArray extends Array {
    push(...items: CategoriesPropertyLike[]): number {
        items.forEach(item => super.push(CategoriesProperty.factory(item)));

        return this.length;
    }
}
