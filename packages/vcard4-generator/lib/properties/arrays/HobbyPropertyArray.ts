import HobbyProperty, { type HobbyConfig } from '../HobbyProperty.js';

export default class HobbyPropertyArray extends Array {
    push(...items: HobbyConfig[]): number {
        items.forEach(item => super.push(HobbyProperty.from(item)));

        return this.length;
    }
}
