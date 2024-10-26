import HobbyProperty from '../HobbyProperty.js';

export default class HobbyPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(HobbyProperty.factory(item)));

        return this.length;
    }
}
