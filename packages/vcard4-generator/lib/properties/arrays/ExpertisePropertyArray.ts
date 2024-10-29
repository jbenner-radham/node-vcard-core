import ExpertiseProperty, { type ExpertiseConfig } from '../ExpertiseProperty.js';

export default class ExpertisePropertyArray extends Array {
    push(...items: ExpertiseConfig[]): number {
        items.forEach(item => super.push(ExpertiseProperty.from(item)));

        return this.length;
    }
}
