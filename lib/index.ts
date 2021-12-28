import AdrProperty, { AdrPropertyLike } from './properties/AdrProperty';
import AdrPropertyArray from './properties/arrays/AdrPropertyArray';
import AnniversaryProperty, { AnniversaryPropertyLike } from './properties/AnniversaryProperty';
import BdayProperty, { BdayPropertyLike } from './properties/BdayProperty';
import CaladruriProperty, { CaladruriPropertyLike } from './properties/CaladruriProperty';
import CaladruriPropertyArray from './properties/arrays/CaladruriPropertyArray';
import CaluriProperty, { CaluriPropertyLike } from './properties/CaluriProperty';
import CaluriPropertyArray from './properties/arrays/CaluriPropertyArray';
import CategoriesProperty, { CategoriesPropertyLike } from './properties/CategoriesProperty';
import CategoriesPropertyArray from './properties/arrays/CategoriesPropertyArray';
import EmailProperty, { EmailPropertyLike } from './properties/EmailProperty';
import EmailPropertyArray from './properties/arrays/EmailPropertyArray';
import FburlProperty, { FburlPropertyLike } from './properties/FburlProperty';
import FburlPropertyArray from './properties/arrays/FburlPropertyArray';
import FnProperty, { FnPropertyLike } from './properties/FnProperty';
import FnPropertyArray from './properties/arrays/FnPropertyArray';
import GenderProperty, { GenderPropertyLike } from './properties/GenderProperty';
import GeoProperty, { GeoPropertyLike } from './properties/GeoProperty';
import GeoPropertyArray from './properties/arrays/GeoPropertyArray';
import ImppProperty, { ImppPropertyLike } from './properties/ImppProperty';
import ImppPropertyArray from './properties/arrays/ImppPropertyArray';
import isNotEmptyString from './util/is-not-empty-string';
import KeyProperty, { KeyPropertyLike } from './properties/KeyProperty';
import KeyPropertyArray from './properties/arrays/KeyPropertyArray';
import KindProperty, { KindPropertyLike } from './properties/KindProperty';
import LangProperty, { LangPropertyLike } from './properties/LangProperty';
import LangPropertyArray from './properties/arrays/LangPropertyArray';
import LogoProperty, { LogoPropertyLike } from './properties/LogoProperty';
import LogoPropertyArray from './properties/arrays/LogoPropertyArray';
import MemberProperty, { MemberPropertyLike } from './properties/MemberProperty';
import MemberPropertyArray from './properties/arrays/MemberPropertyArray';
import NProperty, { NPropertyLike } from './properties/NProperty';
import NicknameProperty, { NicknamePropertyLike } from './properties/NicknameProperty';
import NicknamePropertyArray from './properties/arrays/NicknamePropertyArray';
import NoteProperty, { NotePropertyLike } from './properties/NoteProperty';
import NotePropertyArray from './properties/arrays/NotePropertyArray';
import NullProperty from './properties/NullProperty';
import OrgProperty, { OrgPropertyLike } from './properties/OrgProperty';
import OrgPropertyArray from './properties/arrays/OrgPropertyArray';
import PhotoProperty, { PhotoPropertyLike } from './properties/PhotoProperty';
import PhotoPropertyArray from './properties/arrays/PhotoPropertyArray';
import ProdidProperty, { ProdidPropertyLike } from './properties/ProdidProperty';
import RevProperty, { RevPropertyLike } from './properties/RevProperty';
import RoleProperty, { RolePropertyLike } from './properties/RoleProperty';
import RolePropertyArray from './properties/arrays/RolePropertyArray';
import SoundProperty, { SoundPropertyLike } from './properties/SoundProperty';
import SoundPropertyArray from './properties/arrays/SoundPropertyArray';
import SourceProperty, { SourcePropertyLike } from './properties/SourceProperty';
import SourcePropertyArray from './properties/arrays/SourcePropertyArray';
import TitleProperty, { TitlePropertyLike } from './properties/TitleProperty';
import TitlePropertyArray from './properties/arrays/TitlePropertyArray';
import TzProperty, { TzPropertyLike } from './properties/TzProperty';
import TzPropertyArray from './properties/arrays/TzPropertyArray';
import toString from './util/to-string';
import UidProperty, { UidPropertyLike } from './properties/UidProperty';
import UrlProperty, { UrlPropertyLike } from './properties/UrlProperty';
import UrlPropertyArray from './properties/arrays/UrlPropertyArray';
import VersionProperty, { VersionPropertyLike } from './properties/VersionProperty';

export interface VcardConfig {
    adr?: AdrPropertyLike;
    anniversary?: AnniversaryPropertyLike;
    bday?: BdayPropertyLike;
    caluri?: CaluriPropertyLike;
    caladruri?: CaladruriPropertyLike;
    categories?: CategoriesPropertyLike;
    email?: EmailPropertyLike;
    fburl?: FburlPropertyLike;
    fn: FnPropertyLike;
    gender?: GenderPropertyLike;
    geo?: GeoPropertyLike;
    impp?: ImppPropertyLike;
    key?: KeyPropertyLike;
    kind?: KindPropertyLike;
    lang?: LangPropertyLike;
    logo?: LogoPropertyLike;
    member?: MemberPropertyLike;
    n?: NPropertyLike;
    nickname?: NicknamePropertyLike;
    note?: NotePropertyLike;
    org?: OrgPropertyLike;
    photo?: PhotoPropertyLike;
    prodid?: ProdidPropertyLike;
    rev?: RevPropertyLike;
    role?: RolePropertyLike;
    sound?: SoundPropertyLike;
    source?: SourcePropertyLike;
    title?: TitlePropertyLike;
    tz?: TzPropertyLike;
    uid?: UidPropertyLike;
    url?: UrlPropertyLike;
    version?: VersionProperty;
}

export default class Vcard {
    static readonly EOL: string = '\r\n';

    adr: AdrPropertyArray;

    anniversary: AnniversaryPropertyLike | NullProperty;

    bday: BdayPropertyLike | NullProperty;

    caluri: CaluriPropertyArray;

    caladruri: CaladruriPropertyArray;

    categories: CategoriesPropertyArray;

    email: EmailPropertyArray;

    fburl: FburlPropertyArray;

    fn: FnPropertyArray;

    gender: GenderPropertyLike | NullProperty;

    geo: GeoPropertyArray;

    impp: ImppPropertyArray;

    key: KeyPropertyArray;

    kind: KindPropertyLike | NullProperty;

    lang: LangPropertyArray;

    logo: LogoPropertyArray;

    member: MemberPropertyArray;

    n: NPropertyLike | NullProperty;

    nickname: NicknamePropertyArray;

    note: NotePropertyArray;

    org: OrgPropertyArray;

    photo: PhotoPropertyArray;

    prodid: ProdidPropertyLike | NullProperty;

    rev: RevPropertyLike | NullProperty;

    role: RolePropertyArray;

    sound: SoundPropertyArray;

    source: SourcePropertyArray;

    title: TitlePropertyArray;

    tz: TzPropertyArray;

    uid: UidPropertyLike | NullProperty;

    url: UrlPropertyArray;

    version: VersionPropertyLike;

    constructor(config: VcardConfig) {
        const {
            adr,
            anniversary,
            bday,
            caluri,
            caladruri,
            categories,
            email,
            fburl,
            fn,
            gender,
            geo,
            impp,
            key,
            kind,
            lang,
            logo,
            member,
            n,
            nickname,
            note,
            org,
            photo,
            prodid,
            rev,
            role,
            sound,
            source,
            title,
            tz,
            uid,
            url,
            version
        } = config;
        this.adr = new AdrPropertyArray();
        this.caluri = new CaluriPropertyArray();
        this.caladruri = new CaladruriPropertyArray();
        this.categories = new CategoriesPropertyArray();
        this.email = new EmailPropertyArray();
        this.fburl = new FburlPropertyArray();
        this.fn = new FnPropertyArray();
        this.geo = new GeoPropertyArray();
        this.impp = new ImppPropertyArray();
        this.key = new KeyPropertyArray();
        this.lang = new LangPropertyArray();
        this.logo = new LogoPropertyArray();
        this.member = new MemberPropertyArray();
        this.nickname = new NicknamePropertyArray();
        this.note = new NotePropertyArray();
        this.org = new OrgPropertyArray();
        this.photo = new PhotoPropertyArray();
        this.role = new RolePropertyArray();
        this.sound = new SoundPropertyArray();
        this.source = new SourcePropertyArray();
        this.title = new TitlePropertyArray();
        this.tz = new TzPropertyArray();
        this.url = new UrlPropertyArray();
        adr && this.adr.push(adr);
        caluri && this.caluri.push(caluri);
        caladruri && this.caladruri.push(caladruri);
        categories && this.categories.push(categories);
        email && this.email.push(email);
        fburl && this.fburl.push(fburl);
        fn && this.fn.push(fn);
        geo && this.geo.push(geo);
        impp && this.impp.push(impp);
        key && this.key.push(key);
        lang && this.lang.push(lang);
        logo && this.logo.push(logo);
        member && this.member.push(member);
        nickname && this.nickname.push(nickname);
        note && this.note.push(note);
        org && this.org.push(org);
        photo && this.photo.push(photo);
        role && this.role.push(role);
        sound && this.sound.push(sound);
        source && this.source.push(source);
        title && this.title.push(title);
        tz && this.tz.push(tz);
        url && this.url.push(url);
        this.anniversary = anniversary ? AnniversaryProperty.factory(anniversary) : new NullProperty();
        this.bday = bday ? BdayProperty.factory(bday) : new NullProperty();
        this.gender = gender ? GenderProperty.factory(gender) : new NullProperty();
        this.kind = kind ? KindProperty.factory(kind) : new NullProperty();
        this.n = n ? NProperty.factory(n) : new NullProperty();
        this.prodid = prodid ? ProdidProperty.factory(prodid) : new NullProperty();
        this.rev = rev ? RevProperty.factory(rev) : new NullProperty();
        this.uid = uid ? UidProperty.factory(uid) : new NullProperty();
        this.version = version ? VersionProperty.factory(version) : new VersionProperty();
    }

    toString(): string {
        const properties = [
            'BEGIN:VCARD',
            this.version.toString(),
            ...this.adr.map(toString),
            this.anniversary.toString(),
            this.bday.toString(),
            ...this.caluri.map(toString),
            ...this.caladruri.map(toString),
            ...this.categories.map(toString),
            ...this.email.map(toString),
            ...this.fburl.map(toString),
            ...this.fn.map(toString),
            this.gender.toString(),
            ...this.geo.map(toString),
            ...this.impp.map(toString),
            ...this.key.map(toString),
            this.kind.toString(),
            ...this.lang.map(toString),
            ...this.logo.map(toString),
            ...this.member.map(toString),
            this.n.toString(),
            ...this.nickname.map(toString),
            ...this.note.map(toString),
            ...this.org.map(toString),
            ...this.photo.map(toString),
            this.prodid.toString(),
            this.rev.toString(),
            ...this.role.map(toString),
            ...this.sound.map(toString),
            ...this.source.map(toString),
            ...this.title.map(toString),
            ...this.tz.map(toString),
            this.uid.toString(),
            ...this.url.map(toString),
            'END:VCARD'
        ];

        return properties
            .filter(isNotEmptyString)
            .join(Vcard.EOL);
    }

    validate(): void {
        if (!(this.version instanceof VersionProperty))
            throw new TypeError('The VERSION property is invalid');

        if (this.fn.length === 0)
            throw new TypeError('The FN property is required');

        if (!this.adr.every(adr => adr instanceof AdrProperty))
            throw new TypeError('One or more ADR properties are invalid');

        if (!(this.anniversary instanceof AnniversaryProperty))
            throw new TypeError('The ANNIVERSARY property is invalid');

        if (!(this.bday instanceof BdayProperty))
            throw new TypeError('The BDAY property is invalid');

        if (!this.caluri.every(caluri => caluri instanceof CaluriProperty))
            throw new TypeError('The CALURI property is invalid');

        if (!this.caladruri.every(caladruri => caladruri instanceof CaladruriProperty))
            throw new TypeError('The CALADRURI property is invalid');

        if (!this.categories.every(categories => categories instanceof CategoriesProperty))
            throw new TypeError('The CATEGORIES property is invalid');

        if (!this.email.every(email => email instanceof EmailProperty))
            throw new TypeError('One or more EMAIL properties are invalid');

        if (!this.fburl.every(fburl => fburl instanceof FburlProperty))
            throw new TypeError('One or more FBURL properties are invalid');

        if (!this.fn.every(fn => fn instanceof FnProperty))
            throw new TypeError('One or more FN properties are invalid');

        if (!this.geo.every(geo => geo instanceof GeoProperty))
            throw new TypeError('One or more GEO properties are invalid');

        if (!this.impp.every(impp => impp instanceof ImppProperty))
            throw new TypeError('One or more IMPP properties are invalid');

        if (!this.key.every(key => key instanceof KeyProperty))
            throw new TypeError('One or more KEY properties are invalid');

        if (!this.lang.every(lang => lang instanceof LangProperty))
            throw new TypeError('One or more LANG properties are invalid');

        if (!this.logo.every(logo => logo instanceof LogoProperty))
            throw new TypeError('One or more Logo properties are invalid');

        if (!this.member.every(member => member instanceof MemberProperty))
            throw new TypeError('One or more MEMBER properties are invalid');

        if (!this.nickname.every(nickname => nickname instanceof NicknameProperty))
            throw new TypeError('One or more NICKNAME properties are invalid');

        if (!this.note.every(note => note instanceof NoteProperty))
            throw new TypeError('One or more NOTE properties are invalid');

        if (!this.org.every(org => org instanceof OrgProperty))
            throw new TypeError('One or more ORG properties are invalid');

        if (!this.photo.every(photo => photo instanceof PhotoProperty))
            throw new TypeError('One or more PHOTO properties are invalid');

        if (!(this.prodid instanceof ProdidProperty))
            throw new TypeError('The PRODID property is invalid');

        if (!(this.rev instanceof RevProperty))
            throw new TypeError('The REV property is invalid');

        if (!this.role.every(role => role instanceof RoleProperty))
            throw new TypeError('One or more ROLE properties are invalid');

        if (!this.sound.every(sound => sound instanceof SoundProperty))
            throw new TypeError('One or more SOUND properties are invalid');

        if (!this.source.every(source => source instanceof SourceProperty))
            throw new TypeError('One or more SOURCE properties are invalid');

        if (!this.title.every(title => title instanceof TitleProperty))
            throw new TypeError('One or more TITLE properties are invalid');

        if (!this.tz.every(tz => tz instanceof TzProperty))
            throw new TypeError('One or more TZ properties are invalid');

        if (!(this.uid instanceof UidProperty))
            throw new TypeError('The UID property is invalid');

        if (!this.url.every(url => url instanceof UrlProperty))
            throw new TypeError('One or more URL properties are invalid');
    }
}
