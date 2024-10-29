import HobbyProperty, { type HobbyPropertyLike } from '../HobbyProperty.js';

export default class HobbyPropertyArray extends Array {
    push(...items: HobbyPropertyLike[]): number {
        items.forEach(item => super.push(HobbyProperty.factory(item)));

        return this.length;
    }
}
