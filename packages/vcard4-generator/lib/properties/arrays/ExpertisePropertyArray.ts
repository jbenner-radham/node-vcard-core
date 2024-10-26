import ExpertiseProperty from '../ExpertiseProperty.js';

export default class ExpertisePropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(ExpertiseProperty.factory(item)));

        return this.length;
    }
}
