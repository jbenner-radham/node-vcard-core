import { EOL } from '@vcard/vcard4-meta';
import AdrProperty, { type AdrConfig, AdrRestConfig } from './properties/AdrProperty.js';
import AdrPropertyArray from './properties/arrays/AdrPropertyArray.js';
import AnniversaryProperty, {
    type AnniversaryConfig, AnniversaryRestConfig
} from './properties/AnniversaryProperty.js';
import BdayProperty, { type BdayConfig, BdayRestConfig } from './properties/BdayProperty.js';
import BirthplaceProperty, { type BirthplaceConfig, BirthplaceRestConfig } from './properties/BirthplaceProperty.js';
import CaladruriProperty, { type CaladruriConfig, CaladruriRestConfig } from './properties/CaladruriProperty.js';
import CaladruriPropertyArray from './properties/arrays/CaladruriPropertyArray.js';
import CaluriProperty, { type CaluriConfig, CaluriRestConfig } from './properties/CaluriProperty.js';
import CaluriPropertyArray from './properties/arrays/CaluriPropertyArray.js';
import CategoriesProperty, { type CategoriesConfig, CategoriesRestConfig } from './properties/CategoriesProperty.js';
import CategoriesPropertyArray from './properties/arrays/CategoriesPropertyArray.js';
import ClientpidmapProperty, {
    type ClientpidmapConfig, ClientpidmapRestConfig
} from './properties/ClientpidmapProperty.js';
import ClientpidmapPropertyArray from './properties/arrays/ClientpidmapPropertyArray.js';
import ContactUriProperty, { type ContactUriConfig, ContactUriRestConfig } from './properties/ContactUriProperty.js';
import ContactUriPropertyArray from './properties/arrays/ContactUriPropertyArray.js';
import DeathdateProperty, { type DeathdateConfig, DeathdateRestConfig } from './properties/DeathdateProperty.js';
import DeathplaceProperty, { type DeathplaceConfig, DeathplaceRestConfig } from './properties/DeathplaceProperty.js';
import EmailProperty, { type EmailConfig, EmailRestConfig } from './properties/EmailProperty.js';
import EmailPropertyArray from './properties/arrays/EmailPropertyArray.js';
import ExpertiseProperty, { type ExpertiseConfig, ExpertiseRestConfig } from './properties/ExpertiseProperty.js';
import ExpertisePropertyArray from './properties/arrays/ExpertisePropertyArray.js';
import FburlProperty, { type FburlConfig, FburlRestConfig } from './properties/FburlProperty.js';
import FburlPropertyArray from './properties/arrays/FburlPropertyArray.js';
import FnProperty, { type FnConfig, FnRestConfig } from './properties/FnProperty.js';
import FnPropertyArray from './properties/arrays/FnPropertyArray.js';
import GenderProperty, { type GenderConfig, GenderRestConfig } from './properties/GenderProperty.js';
import GeoProperty, { type GeoConfig, GeoRestConfig } from './properties/GeoProperty.js';
import GeoPropertyArray from './properties/arrays/GeoPropertyArray.js';
import HobbyProperty, { type HobbyConfig, HobbyRestConfig } from './properties/HobbyProperty.js';
import HobbyPropertyArray from './properties/arrays/HobbyPropertyArray.js';
import ImppProperty, { type ImppConfig, ImppRestConfig } from './properties/ImppProperty.js';
import ImppPropertyArray from './properties/arrays/ImppPropertyArray.js';
import isNotEmptyString from './util/is-not-empty-string.js';
import InterestProperty, { type InterestConfig, InterestRestConfig } from './properties/InterestProperty.js';
import InterestPropertyArray from './properties/arrays/InterestPropertyArray.js';
import KeyProperty, { type KeyConfig, KeyRestConfig } from './properties/KeyProperty.js';
import KeyPropertyArray from './properties/arrays/KeyPropertyArray.js';
import KindProperty, { type KindConfig, KindRestConfig } from './properties/KindProperty.js';
import LangProperty, { type LangConfig, LangRestConfig } from './properties/LangProperty.js';
import LangPropertyArray from './properties/arrays/LangPropertyArray.js';
import LogoProperty, { type LogoConfig, LogoRestConfig } from './properties/LogoProperty.js';
import LogoPropertyArray from './properties/arrays/LogoPropertyArray.js';
import MemberProperty, { type MemberConfig, MemberRestConfig } from './properties/MemberProperty.js';
import MemberPropertyArray from './properties/arrays/MemberPropertyArray.js';
import NProperty, { type NConfig, NRestConfig } from './properties/NProperty.js';
import NicknameProperty, { type NicknameConfig, NicknameRestConfig } from './properties/NicknameProperty.js';
import NicknamePropertyArray from './properties/arrays/NicknamePropertyArray.js';
import NoteProperty, { type NoteConfig, NoteRestConfig } from './properties/NoteProperty.js';
import NotePropertyArray from './properties/arrays/NotePropertyArray.js';
import NullProperty from './properties/NullProperty.js';
import OrgProperty, { type OrgConfig, OrgRestConfig } from './properties/OrgProperty.js';
import OrgPropertyArray from './properties/arrays/OrgPropertyArray.js';
import OrgDirectoryProperty, {
    type OrgDirectoryConfig, OrgDirectoryRestConfig
} from './properties/OrgDirectoryProperty.js';
import OrgDirectoryPropertyArray from './properties/arrays/OrgDirectoryPropertyArray.js';
import PhotoProperty, { type PhotoConfig, PhotoRestConfig } from './properties/PhotoProperty.js';
import PhotoPropertyArray from './properties/arrays/PhotoPropertyArray.js';
import ProdidProperty, { type ProdidConfig, ProdidRestConfig } from './properties/ProdidProperty.js';
import RelatedProperty, { type RelatedConfig, RelatedRestConfig } from './properties/RelatedProperty.js';
import RelatedPropertyArray from './properties/arrays/RelatedPropertyArray.js';
import RevProperty, { type RevConfig, RevRestConfig } from './properties/RevProperty.js';
import RoleProperty, { type RoleConfig, RoleRestConfig } from './properties/RoleProperty.js';
import RolePropertyArray from './properties/arrays/RolePropertyArray.js';
import SoundProperty, { type SoundConfig, SoundRestConfig } from './properties/SoundProperty.js';
import SoundPropertyArray from './properties/arrays/SoundPropertyArray.js';
import SourceProperty, { type SourceConfig, SourceRestConfig } from './properties/SourceProperty.js';
import SourcePropertyArray from './properties/arrays/SourcePropertyArray.js';
import TelProperty, { type TelConfig, TelRestConfig } from './properties/TelProperty.js';
import TelPropertyArray from './properties/arrays/TelPropertyArray.js';
import TitleProperty, { type TitleConfig, TitleRestConfig } from './properties/TitleProperty.js';
import TitlePropertyArray from './properties/arrays/TitlePropertyArray.js';
import TzProperty, { type TzConfig, TzRestConfig } from './properties/TzProperty.js';
import TzPropertyArray from './properties/arrays/TzPropertyArray.js';
import toString from './util/to-string.js';
import UidProperty, { type UidConfig, UidRestConfig } from './properties/UidProperty.js';
import UrlProperty, { type UrlConfig, UrlRestConfig } from './properties/UrlProperty.js';
import UrlPropertyArray from './properties/arrays/UrlPropertyArray.js';
import VersionProperty, { type VersionConfig, VersionRestConfig } from './properties/VersionProperty.js';
import XmlProperty, { type XmlConfig, XmlRestConfig } from './properties/XmlProperty.js';
import XmlPropertyArray from './properties/arrays/XmlPropertyArray.js';

export interface Vcard4GeneratorConfig {
    adr?: AdrConfig;
    anniversary?: AnniversaryConfig;
    bday?: BdayConfig;
    birthplace?: BirthplaceConfig;
    caluri?: CaluriConfig;
    caladruri?: CaladruriConfig;
    categories?: CategoriesConfig;
    clientpidmap?: ClientpidmapConfig;
    contactUri?: ContactUriConfig;
    deathdate?: DeathdateConfig;
    deathplace?: DeathplaceConfig;
    email?: EmailConfig;
    expertise?: ExpertiseConfig;
    fburl?: FburlConfig;
    fn: FnConfig;
    gender?: GenderConfig;
    geo?: GeoConfig;
    hobby?: HobbyConfig;
    impp?: ImppConfig;
    interest?: InterestConfig;
    key?: KeyConfig;
    kind?: KindConfig;
    lang?: LangConfig;
    logo?: LogoConfig;
    member?: MemberConfig;
    n?: NConfig;
    nickname?: NicknameConfig;
    note?: NoteConfig;
    org?: OrgConfig;
    orgDirectory?: OrgDirectoryConfig;
    photo?: PhotoConfig;
    prodid?: ProdidConfig;
    related?: RelatedConfig;
    rev?: RevConfig;
    role?: RoleConfig;
    sound?: SoundConfig;
    source?: SourceConfig;
    tel?: TelConfig;
    title?: TitleConfig;
    tz?: TzConfig;
    uid?: UidConfig;
    url?: UrlConfig;
    version?: VersionProperty;
    xml?: XmlConfig;
}

export default class Vcard4Generator {
    adr: AdrPropertyArray;

    anniversary: AnniversaryConfig | NullProperty;

    bday: BdayConfig | NullProperty;

    birthplace: BirthplaceConfig | NullProperty;

    caluri: CaluriPropertyArray;

    caladruri: CaladruriPropertyArray;

    categories: CategoriesPropertyArray;

    clientpidmap: ClientpidmapPropertyArray;

    contactUri: ContactUriPropertyArray;

    deathdate: DeathdateConfig | NullProperty;

    deathplace: DeathplaceConfig | NullProperty;

    email: EmailPropertyArray;

    expertise: ExpertisePropertyArray;

    fburl: FburlPropertyArray;

    fn: FnPropertyArray;

    gender: GenderConfig | NullProperty;

    geo: GeoPropertyArray;

    hobby: HobbyPropertyArray;

    impp: ImppPropertyArray;

    interest: InterestPropertyArray;

    key: KeyPropertyArray;

    kind: KindConfig | NullProperty;

    lang: LangPropertyArray;

    logo: LogoPropertyArray;

    member: MemberPropertyArray;

    n: NConfig | NullProperty;

    nickname: NicknamePropertyArray;

    note: NotePropertyArray;

    org: OrgPropertyArray;

    orgDirectory: OrgDirectoryPropertyArray;

    photo: PhotoPropertyArray;

    prodid: ProdidConfig | NullProperty;

    related: RelatedPropertyArray;

    rev: RevConfig | NullProperty;

    role: RolePropertyArray;

    sound: SoundPropertyArray;

    source: SourcePropertyArray;

    tel: TelPropertyArray;

    title: TitlePropertyArray;

    tz: TzPropertyArray;

    uid: UidConfig | NullProperty;

    url: UrlPropertyArray;

    version: VersionConfig;

    xml: XmlPropertyArray;

    constructor(config: Vcard4GeneratorConfig) {
        const {
            adr,
            anniversary,
            bday,
            birthplace,
            caluri,
            caladruri,
            categories,
            clientpidmap,
            contactUri,
            deathdate,
            deathplace,
            email,
            expertise,
            fburl,
            fn,
            gender,
            geo,
            hobby,
            impp,
            interest,
            key,
            kind,
            lang,
            logo,
            member,
            n,
            nickname,
            note,
            org,
            orgDirectory,
            photo,
            prodid,
            related,
            rev,
            role,
            sound,
            source,
            tel,
            title,
            tz,
            uid,
            url,
            version,
            xml
        } = config;
        this.adr = new AdrPropertyArray();
        this.caluri = new CaluriPropertyArray();
        this.caladruri = new CaladruriPropertyArray();
        this.categories = new CategoriesPropertyArray();
        this.clientpidmap = new ClientpidmapPropertyArray();
        this.contactUri = new ContactUriPropertyArray();
        this.email = new EmailPropertyArray();
        this.expertise = new ExpertisePropertyArray();
        this.fburl = new FburlPropertyArray();
        this.fn = new FnPropertyArray();
        this.geo = new GeoPropertyArray();
        this.hobby = new HobbyPropertyArray();
        this.impp = new ImppPropertyArray();
        this.interest = new InterestPropertyArray();
        this.key = new KeyPropertyArray();
        this.lang = new LangPropertyArray();
        this.logo = new LogoPropertyArray();
        this.member = new MemberPropertyArray();
        this.nickname = new NicknamePropertyArray();
        this.note = new NotePropertyArray();
        this.org = new OrgPropertyArray();
        this.orgDirectory = new OrgDirectoryPropertyArray();
        this.photo = new PhotoPropertyArray();
        this.related = new RelatedPropertyArray();
        this.role = new RolePropertyArray();
        this.sound = new SoundPropertyArray();
        this.source = new SourcePropertyArray();
        this.tel = new TelPropertyArray();
        this.title = new TitlePropertyArray();
        this.tz = new TzPropertyArray();
        this.url = new UrlPropertyArray();
        this.xml = new XmlPropertyArray();
        adr && this.adr.push(adr);
        caluri && this.caluri.push(caluri);
        caladruri && this.caladruri.push(caladruri);
        categories && this.categories.push(categories);
        clientpidmap && this.clientpidmap.push(clientpidmap);
        contactUri && this.contactUri.push(contactUri);
        email && this.email.push(email);
        expertise && this.expertise.push(expertise);
        fburl && this.fburl.push(fburl);
        fn && this.fn.push(fn);
        geo && this.geo.push(geo);
        hobby && this.hobby.push(hobby);
        impp && this.impp.push(impp);
        interest && this.interest.push(interest);
        key && this.key.push(key);
        lang && this.lang.push(lang);
        logo && this.logo.push(logo);
        member && this.member.push(member);
        nickname && this.nickname.push(nickname);
        note && this.note.push(note);
        org && this.org.push(org);
        orgDirectory && this.orgDirectory.push(orgDirectory);
        photo && this.photo.push(photo);
        related && this.related.push(related);
        role && this.role.push(role);
        sound && this.sound.push(sound);
        source && this.source.push(source);
        tel && this.tel.push(tel);
        title && this.title.push(title);
        tz && this.tz.push(tz);
        url && this.url.push(url);
        xml && this.xml.push(xml);
        this.anniversary = anniversary ? AnniversaryProperty.from(anniversary) : new NullProperty();
        this.bday = bday ? BdayProperty.from(bday) : new NullProperty();
        this.birthplace = birthplace ? BirthplaceProperty.from(birthplace) : new NullProperty();
        this.deathdate = deathdate ? DeathdateProperty.from(deathdate) : new NullProperty();
        this.deathplace = deathplace ? DeathplaceProperty.from(deathplace) : new NullProperty();
        this.gender = gender ? GenderProperty.from(gender) : new NullProperty();
        this.kind = kind ? KindProperty.from(kind) : new NullProperty();
        this.n = n ? NProperty.from(n) : new NullProperty();
        this.prodid = prodid ? ProdidProperty.from(prodid) : new NullProperty();
        this.rev = rev ? RevProperty.from(rev) : new NullProperty();
        this.uid = uid ? UidProperty.from(uid) : new NullProperty();
        this.version = version ? VersionProperty.from(version) : new VersionProperty();
    }

    toString(): string {
        const properties = [
            'BEGIN:VCARD',
            this.version.toString(),
            ...this.adr.map(toString),
            this.anniversary.toString(),
            this.bday.toString(),
            this.birthplace.toString(),
            ...this.caluri.map(toString),
            ...this.caladruri.map(toString),
            ...this.categories.map(toString),
            ...this.clientpidmap.map(toString),
            ...this.contactUri.map(toString),
            this.deathdate.toString(),
            this.deathplace.toString(),
            ...this.email.map(toString),
            ...this.expertise.map(toString),
            ...this.fburl.map(toString),
            ...this.fn.map(toString),
            this.gender.toString(),
            ...this.geo.map(toString),
            ...this.hobby.map(toString),
            ...this.impp.map(toString),
            ...this.interest.map(toString),
            ...this.key.map(toString),
            this.kind.toString(),
            ...this.lang.map(toString),
            ...this.logo.map(toString),
            ...this.member.map(toString),
            this.n.toString(),
            ...this.nickname.map(toString),
            ...this.note.map(toString),
            ...this.org.map(toString),
            ...this.orgDirectory.map(toString),
            ...this.photo.map(toString),
            this.prodid.toString(),
            ...this.related.map(toString),
            this.rev.toString(),
            ...this.role.map(toString),
            ...this.sound.map(toString),
            ...this.source.map(toString),
            ...this.tel.map(toString),
            ...this.title.map(toString),
            ...this.tz.map(toString),
            this.uid.toString(),
            ...this.url.map(toString),
            ...this.xml.map(toString),
            'END:VCARD'
        ];

        return properties
            .filter(isNotEmptyString)
            .join(EOL);
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

        if (!(this.birthplace instanceof BirthplaceProperty))
            throw new TypeError('The BIRTHPLACE property is invalid');

        if (!this.caluri.every(caluri => caluri instanceof CaluriProperty))
            throw new TypeError('One or more CALURI properties are invalid');

        if (!this.caladruri.every(caladruri => caladruri instanceof CaladruriProperty))
            throw new TypeError('One or more CALADRURI properties are invalid');

        if (!this.categories.every(categories => categories instanceof CategoriesProperty))
            throw new TypeError('One or more CATEGORIES properties are invalid');

        if (!this.clientpidmap.every(clientpidmap => clientpidmap instanceof ClientpidmapProperty))
            throw new TypeError('One or more CLIENTPIDMAP properties are invalid');

        if (!this.contactUri.every(contactUri => contactUri instanceof ContactUriProperty))
            throw new TypeError('One or more CONTACT-URI properties are invalid');

        if (!(this.deathdate instanceof DeathdateProperty))
            throw new TypeError('The DEATHDATE property is invalid');

        if (!(this.deathplace instanceof DeathplaceProperty))
            throw new TypeError('The DEATHPLACE property is invalid');

        if (!this.email.every(email => email instanceof EmailProperty))
            throw new TypeError('One or more EMAIL properties are invalid');

        if (!this.expertise.every(expertise => expertise instanceof ExpertiseProperty))
            throw new TypeError('One or more EXPERTISE properties are invalid');

        if (!this.fburl.every(fburl => fburl instanceof FburlProperty))
            throw new TypeError('One or more FBURL properties are invalid');

        if (!this.fn.every(fn => fn instanceof FnProperty))
            throw new TypeError('One or more FN properties are invalid');

        if (!this.geo.every(geo => geo instanceof GeoProperty))
            throw new TypeError('One or more GEO properties are invalid');

        if (!this.hobby.every(hobby => hobby instanceof HobbyProperty))
            throw new TypeError('One or more HOBBY properties are invalid');

        if (!this.impp.every(impp => impp instanceof ImppProperty))
            throw new TypeError('One or more IMPP properties are invalid');

        if (!this.interest.every(interest => interest instanceof InterestProperty))
            throw new TypeError('One or more INTEREST properties are invalid');

        if (!this.key.every(key => key instanceof KeyProperty))
            throw new TypeError('One or more KEY properties are invalid');

        if (!this.lang.every(lang => lang instanceof LangProperty))
            throw new TypeError('One or more LANG properties are invalid');

        if (!this.logo.every(logo => logo instanceof LogoProperty))
            throw new TypeError('One or more LOGO properties are invalid');

        if (!this.member.every(member => member instanceof MemberProperty))
            throw new TypeError('One or more MEMBER properties are invalid');

        if (!this.nickname.every(nickname => nickname instanceof NicknameProperty))
            throw new TypeError('One or more NICKNAME properties are invalid');

        if (!this.note.every(note => note instanceof NoteProperty))
            throw new TypeError('One or more NOTE properties are invalid');

        if (!this.org.every(org => org instanceof OrgProperty))
            throw new TypeError('One or more ORG properties are invalid');

        if (!this.orgDirectory.every(orgDirectory => orgDirectory instanceof OrgDirectoryProperty))
            throw new TypeError('One or more ORG-DIRECTORY properties are invalid');

        if (!this.photo.every(photo => photo instanceof PhotoProperty))
            throw new TypeError('One or more PHOTO properties are invalid');

        if (!(this.prodid instanceof ProdidProperty))
            throw new TypeError('The PRODID property is invalid');

        if (!this.related.every(related => related instanceof RelatedProperty))
            throw new TypeError('One or more RELATED properties are invalid');

        if (!(this.rev instanceof RevProperty))
            throw new TypeError('The REV property is invalid');

        if (!this.role.every(role => role instanceof RoleProperty))
            throw new TypeError('One or more ROLE properties are invalid');

        if (!this.sound.every(sound => sound instanceof SoundProperty))
            throw new TypeError('One or more SOUND properties are invalid');

        if (!this.source.every(source => source instanceof SourceProperty))
            throw new TypeError('One or more SOURCE properties are invalid');

        if (!this.tel.every(tel => tel instanceof TelProperty))
            throw new TypeError('One or more TEL properties are invalid');

        if (!this.title.every(title => title instanceof TitleProperty))
            throw new TypeError('One or more TITLE properties are invalid');

        if (!this.tz.every(tz => tz instanceof TzProperty))
            throw new TypeError('One or more TZ properties are invalid');

        if (!(this.uid instanceof UidProperty))
            throw new TypeError('The UID property is invalid');

        if (!this.url.every(url => url instanceof UrlProperty))
            throw new TypeError('One or more URL properties are invalid');

        if (!this.xml.every(xml => xml instanceof XmlProperty))
            throw new TypeError('One or more XML properties are invalid');
    }
}

export type {
    AdrConfig,
    AnniversaryConfig,
    BdayConfig,
    BirthplaceConfig,
    CaluriConfig,
    CaladruriConfig,
    CategoriesConfig,
    ClientpidmapConfig,
    ContactUriConfig,
    DeathdateConfig,
    DeathplaceConfig,
    EmailConfig,
    ExpertiseConfig,
    FburlConfig,
    FnConfig,
    GenderConfig,
    GeoConfig,
    HobbyConfig,
    ImppConfig,
    InterestConfig,
    KeyConfig,
    KindConfig,
    LangConfig,
    LogoConfig,
    MemberConfig,
    NConfig,
    NicknameConfig,
    NoteConfig,
    OrgConfig,
    OrgDirectoryConfig,
    PhotoConfig,
    ProdidConfig,
    RelatedConfig,
    RevConfig,
    RoleConfig,
    SoundConfig,
    SourceConfig,
    TelConfig,
    TitleConfig,
    TzConfig,
    UidConfig,
    UrlConfig,
    VersionConfig,
    XmlConfig,
    AdrRestConfig,
    AnniversaryRestConfig,
    BdayRestConfig,
    BirthplaceRestConfig,
    CaladruriRestConfig,
    CaluriRestConfig,
    CategoriesRestConfig,
    ClientpidmapRestConfig,
    ContactUriRestConfig,
    DeathdateRestConfig,
    DeathplaceRestConfig,
    EmailRestConfig,
    ExpertiseRestConfig,
    FburlRestConfig,
    FnRestConfig,
    GenderRestConfig,
    GeoRestConfig,
    HobbyRestConfig,
    ImppRestConfig,
    InterestRestConfig,
    KeyRestConfig,
    KindRestConfig,
    LangRestConfig,
    LogoRestConfig,
    MemberRestConfig,
    NRestConfig,
    NicknameRestConfig,
    NoteRestConfig,
    OrgRestConfig,
    OrgDirectoryRestConfig,
    PhotoRestConfig,
    ProdidRestConfig,
    RelatedRestConfig,
    RevRestConfig,
    RoleRestConfig,
    SoundRestConfig,
    SourceRestConfig,
    TelRestConfig,
    TitleRestConfig,
    TzRestConfig,
    UidRestConfig,
    UrlRestConfig,
    VersionRestConfig,
    XmlRestConfig
};

export type {
    Calscale,
    Cardinality,
    Group,
    HobbyOrInterestLevel,
    Pref,
    Type,
    Value,
    Options
} from './types.js';
