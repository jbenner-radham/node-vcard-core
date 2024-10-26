import CategoriesProperty from '../CategoriesProperty.js';

export default class CategoriesPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(CategoriesProperty.factory(item)));

        return this.length;
    }
}
