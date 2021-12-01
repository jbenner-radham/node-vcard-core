import Adr from './properties/Adr';
import AdrArray from './properties/arrays/AdrArray';
import Fn from './properties/Fn';
import FnArray from './properties/arrays/FnArray';
import Version from './properties/Version';

export default class Vcard {
    static readonly EOL: string = '\r\n';

    adr: AdrArray = new AdrArray();

    fn: FnArray = new FnArray();

    version: Version;

    constructor({ fn, version }: { fn?: Fn | string, version?: Version }) {
        fn && this.fn.push(fn);
        this.version = version ?? new Version();
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
        if (!(this.version instanceof Version))
            throw new TypeError(`The VERSION property is invalid`)

        if (this.fn.length === 0)
            throw new TypeError(`The FN property is required`)

        if (!this.fn.every(fn => fn instanceof Fn))
            throw new TypeError(`One or more FN properties are invalid`)
    }
}
