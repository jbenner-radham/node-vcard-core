import ExpertiseProperty from '../ExpertiseProperty';

export default class ExpertisePropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(ExpertiseProperty.factory(item)));

        return this.length;
    }
}
