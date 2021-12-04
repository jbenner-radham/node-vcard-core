import AdrProperty from './properties/AdrProperty';
import AdrPropertyArray from './properties/arrays/AdrPropertyArray';
import FnProperty from './properties/FnProperty';
import FnPropertyArray from './properties/arrays/FnPropertyArray';
import VersionProperty from './properties/VersionProperty';

export default class Vcard {
    static readonly EOL: string = '\r\n';

    adr: AdrPropertyArray = new AdrPropertyArray();

    fn: FnPropertyArray = new FnPropertyArray();

    version: VersionProperty;

    constructor({ fn, version }: { fn?: FnProperty | string, version?: VersionProperty }) {
        fn && this.fn.push(fn);
        this.version = version ?? new VersionProperty();
    }

    toString(): string {
        return [
            'BEGIN:VCARD',
            this.version.toString(),
            ...this.fn.map(fn => fn.toString()),
            'END:VCARD'
        ].join(Vcard.EOL);
    }

    validate(): void {
        if (!(this.version instanceof VersionProperty))
            throw new TypeError(`The VERSION property is invalid`);

        if (this.fn.length === 0)
            throw new TypeError(`The FN property is required`);

        if (!this.fn.every(fn => fn instanceof FnProperty))
            throw new TypeError(`One or more FN properties are invalid`);
    }
}
