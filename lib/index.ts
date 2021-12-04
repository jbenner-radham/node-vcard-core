import AdrProperty from './properties/AdrProperty';
import AdrPropertyArray from './properties/arrays/AdrPropertyArray';
import FnProperty from './properties/FnProperty';
import FnPropertyArray from './properties/arrays/FnPropertyArray';
import NProperty from './properties/NProperty';
import NullProperty from './properties/NullProperty';
import VersionProperty from './properties/VersionProperty';

export default class Vcard {
    static readonly EOL: string = '\r\n';

    adr: AdrPropertyArray = new AdrPropertyArray();

    fn: FnPropertyArray = new FnPropertyArray();

    n: NProperty | NullProperty;

    version: VersionProperty;

    constructor({ fn, n, version }: { fn?: FnProperty | string, n?: NProperty, version?: VersionProperty }) {
        fn && this.fn.push(fn);
        this.n = n ?? new NullProperty();
        this.version = version ?? new VersionProperty();
    }

    toString(): string {
        const properties = [
            'BEGIN:VCARD',
            this.version.toString(),
            ...this.fn.map(fn => fn.toString()),
            this.n.toString(),
            'END:VCARD'
        ];
        const isNotEmptyString = (value: string): boolean => value !== '';

        return properties
            .filter(isNotEmptyString)
            .join(Vcard.EOL);
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
