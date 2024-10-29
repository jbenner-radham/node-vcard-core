import ExpertiseProperty, { type ExpertisePropertyLike } from '../ExpertiseProperty.js';

export default class ExpertisePropertyArray extends Array {
    push(...items: ExpertisePropertyLike[]): number {
        items.forEach(item => super.push(ExpertiseProperty.factory(item)));

        return this.length;
    }
}
