import CategoriesProperty, { type CategoriesConfig } from '../CategoriesProperty.js';

export default class CategoriesPropertyArray extends Array {
    push(...items: CategoriesConfig[]): number {
        items.forEach(item => super.push(CategoriesProperty.from(item)));

        return this.length;
    }
}
