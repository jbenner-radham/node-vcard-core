@vcard/vcard4-generator
=======================
[![Build Status][BUILD BADGE]][BUILD PAGE] [![npm Version][NPM BADGE]][NPM PAGE] [![Node Version][NODE BADGE]][NODE PAGE]

A library for generating [v4 vCards](https://datatracker.ietf.org/doc/html/rfc6350).

Heads Up!
---------
This library is fully functional but is still a work in progress and features are still being added. API stability
across versions is not yet guaranteed.

Install
-------
```sh-session
npm install @vcard/vcard4-generator
```

Usage
-----

### JavaScript
```js
import Vcard4Generator from '@vcard/vcard4-generator';

const config = {
    fn: 'Captain Awesome',
    email: 'hello@example.com',
    url: 'https://www.example.com/'
};
const vcard = new Vcard4Generator(config);

vcard.toString();
// > BEGIN:VCARD
// > VERSION:4.0
// > EMAIL:hello@example.com
// > FN:Captain Awesome
// > URL:https://www.example.com/
// > END:VCARD

// Properties that can have multiple instances are represented by arrays.
vcard.fn[0].toString();
// > FN:Captain Awesome

vcard.fn[0].valueOf();
// > Captain Awesome

// New property instances can simply be pushed to the corresponding property array.
vcard.fn.push('Alex Awesome');

vcard.toString();
// > BEGIN:VCARD
// > VERSION:4.0
// > EMAIL:hello@example.com
// > FN:Captain Awesome
// > FN:Alex Awesome
// > URL:https://www.example.com/
// > END:VCARD
```

### TypeScript
```ts
import Vcard4Generator, { Vcard4GeneratorConfig } from '@vcard/vcard4-generator';

const config: Vcard4GeneratorConfig = {
    fn: 'Captain Awesome',
    email: 'hello@example.com',
    url: 'https://www.example.com/'
};
const vcard = new Vcard4Generator(config);

vcard.toString();
// > BEGIN:VCARD
// > VERSION:4.0
// > EMAIL:hello@example.com
// > FN:Captain Awesome
// > URL:https://www.example.com/
// > END:VCARD

// Properties that can have multiple instances are represented by arrays.
vcard.fn[0].toString();
// > FN:Captain Awesome

vcard.fn[0].valueOf();
// > Captain Awesome

// New property instances can simply be pushed to the corresponding property array.
vcard.fn.push('Alex Awesome');

vcard.toString();
// > BEGIN:VCARD
// > VERSION:4.0
// > EMAIL:hello@example.com
// > FN:Captain Awesome
// > FN:Alex Awesome
// > URL:https://www.example.com/
// > END:VCARD
```

**NOTE**: This is a pure ESM package. See [here](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for details.

Building
--------
```sh-session
npm run build
```

Testing
-------
After building:

```sh-session
npm test
```

**NOTE**: This tests the entire monorepo, not just this package.

To-Do
-----
- [x] Properties
  - [x] `ADR`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `LABEL` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `GEO` Parameter
    - [x] `TZ` Parameter
    - [x] `ALTID` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `CC` Parameter _(RFC 8605)_
    - [x] Additional Address Components _(RFC 9554)_
  - [x] `ANNIVERSARY`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `ALTID` Parameter
    - [x] `CALSCALE` Parameter _(for `date-and-or-time` type only)_
  - [x] `BDAY`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `ALTID` Parameter
    - [x] `CALSCALE` Parameter _(for `date-and-or-time` type only)_
    - [x] `LANGUAGE` Parameter _(for `text` type only)_
  - [x] `BEGIN`
    - [x] No Parameters
  - [x] `BIRTHPLACE` _(RFC6474)_
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `LANGUAGE` Parameter
  - [x] `CALADRURI`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `CALURI`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `CATEGORIES`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `CLIENTPIDMAP`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] No Parameters
    - [x] No `VALUE` Parameter
  - [x] `CONTACT-URI` _(RFC8605)_
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PREF` Parameter
  - [x] `DEATHDATE` _(RFC6474)_
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `CALSCALE` Parameter _(for `date-and-or-time` type only)_
    - [x] `LANGUAGE` Parameter _(for `text` type only)_
    - [x] `ALTID` Parameter
  - [x] `DEATHPLACE` _(RFC6474)_
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `ALTID` Parameter
  - [x] `EMAIL`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `END`
    - [x] No Parameters
  - [x] `EXPERTISE` _(RFC6715)_
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `LEVEL` Parameter
    - [x] `INDEX` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PREF` Parameter
    - [x] `ALTID` Parameter
    - [x] `TYPE` Parameter
  - [x] `FBURL`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `FN`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `TYPE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `ALTID` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
  - [x] `GENDER`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
  - [x] `GEO`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `HOBBY` _(RFC6715)_
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `LEVEL` Parameter
    - [x] `INDEX` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PREF` Parameter
    - [x] `ALTID` Parameter
    - [x] `TYPE` Parameter
  - [x] `IMPP`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `INTEREST` _(RFC6715)_
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `LEVEL` Parameter
    - [x] `INDEX` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PREF` Parameter
    - [x] `ALTID` Parameter
    - [x] `TYPE` Parameter
  - [x] `KEY`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `MEDIATYPE` Parameter _(for `URI` type only)_
    - [x] `ALTID` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
  - [x] `KIND`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
  - [x] `LANG`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `ALTID` Parameter
    - [x] `TYPE` Parameter
  - [x] `LOGO`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `MEMBER`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `ALTID` Parameter
    - [x] `MEDIATYPE` Parameter
  - [x] `N`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `SORT-AS` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `ALTID` Parameter
    - [x] Additional Name Components _(RFC 9554)_
  - [x] `NICKNAME`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `TYPE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `ALTID` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
  - [x] `NOTE`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `ORG`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `SORT-AS` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `ALTID` Parameter
    - [x] `TYPE` Parameter
  - [x] `ORG-DIRECTORY` _(RFC6715)_
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `INDEX` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `ALTID` Parameter
    - [x] `TYPE` Parameter
  - [x] `PHOTO`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `ALTID` Parameter
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `PREF` Parameter
    - [x] `PID` Parameter
  - [x] `PRODID`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
  - [x] `RELATED`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `MEDIATYPE` Parameter _(for `URI` type only)_
    - [x] `LANGUAGE` Parameter _(for `text` type only)_
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `ALTID` Parameter
    - [x] `TYPE` Parameter
  - [x] `REV`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
  - [x] `ROLE`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `SOUND`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `SOURCE`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `ALTID` Parameter
    - [x] `MEDIATYPE` Parameter
  - [x] `TEL`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `MEDIATYPE` Parameter _(for `URI` type only)_
    - [x] `TYPE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `ALTID` Parameter
  - [x] `TITLE`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `ALTID` Parameter
    - [x] `TYPE` Parameter
  - [x] `TZ`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `ALTID` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
  - [x] `UID`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
  - [x] `URL`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `VERSION`
    - [x] No Parameters
  - [x] `XML`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `ALTID` Parameter
- [x] Implement Parameter Value Encoding as Specified in [RFC6868](https://datatracker.ietf.org/doc/html/rfc6868)
- [x] Implement Property Grouping As Specified In [RFC6350 § 3.3](https://www.rfc-editor.org/rfc/rfc6350.html#section-3.3)

Reference
---------

### Property Cardinalities
Property cardinalities are indicated using the following notation,
which is based on ABNF (see [RFC5234], Section 3.6):

| Cardinality | Meaning                                          |
|:-----------:|--------------------------------------------------|
|      1      | Exactly one instance per vCard MUST be present.  |
|      *1     | Exactly one instance per vCard MAY be present.   |
|      1*     | One or more instances per vCard MUST be present. |
|      *      | One or more instances per vCard MAY be present.  |

Properties defined in a vCard instance may have multiple values
depending on the property cardinality.  The general rule for encoding
multi-valued properties is to simply create a new content line for
each value (including the property name).  However, it should be
noted that some value types support encoding multiple values in a
single content line by separating the values with a comma ",".  This
approach has been taken for several of the content types defined
below (date, time, integer, float).

### Property Parameters
A property can have attributes associated with it.  These "property
parameters" contain meta-information about the property or the
property value.  In some cases, the property parameter can be multi-
valued in which case the property parameter value elements are
separated by a COMMA (U+002C).

Property parameter value elements that contain the COLON (U+003A),
SEMICOLON (U+003B), or COMMA (U+002C) character separators MUST be
specified as quoted-string text values.  Property parameter values
MUST NOT contain the DQUOTE (U+0022) character.  The DQUOTE character
is used as a delimiter for parameter values that contain restricted
characters or URI text.

Applications MUST ignore x-param and iana-param values they don't
recognize.

### Property Value Escaping
Some properties may contain one or more values delimited by a COMMA
character (U+002C).  Therefore, a COMMA character in a value MUST be
escaped with a BACKSLASH character (U+005C), even for properties that
don't allow multiple instances (for consistency).

Some properties (e.g., N and ADR) comprise multiple fields delimited
by a SEMICOLON character (U+003B).  Therefore, a SEMICOLON in a field
of such a "compound" property MUST be escaped with a BACKSLASH
character.  SEMICOLON characters in non-compound properties MAY be
escaped.  On input, an escaped SEMICOLON character is never a field
separator.  An unescaped SEMICOLON character may be a field
separator, depending on the property in which it appears.

Furthermore, some fields of compound properties may contain a list of
values delimited by a COMMA character.  Therefore, a COMMA character
in one of a field's values MUST be escaped with a BACKSLASH
character, even for fields that don't allow multiple values (for
consistency).  Compound properties allowing multiple instances MUST
NOT be encoded in a single content line.

Finally, BACKSLASH characters in values MUST be escaped with a
BACKSLASH character.  NEWLINE (U+000A) characters in values MUST be
encoded by two characters: a BACKSLASH followed by either an 'n'
(U+006E) or an 'N' (U+004E).

In all other cases, escaping MUST NOT be used.

### Links
- [vCard Format Specification](https://datatracker.ietf.org/doc/html/rfc6350)
- [vCard KIND:application](https://datatracker.ietf.org/doc/html/rfc6473)
- [vCard Format Extensions: Place of Birth, Place and Date of Death](https://datatracker.ietf.org/doc/html/rfc6474/)
- [vCard Format Extensions: Representing vCard Extensions Defined by the Open Mobile Alliance (OMA) Converged Address Book (CAB) Group](https://datatracker.ietf.org/doc/html/rfc6715/)
- [Additional Data Related to an Emergency Call § vCard Parameter Value Registration](https://datatracker.ietf.org/doc/html/rfc7852/#section-11.7)
- [vCard Format Extensions: ICANN Extensions for the Registration Data Access Protocol (RDAP)](https://datatracker.ietf.org/doc/html/rfc8605/)
- [vCard Format Extensions for JSContact](https://datatracker.ietf.org/doc/html/rfc9554/)
- [vCard Elements (IANA Protocol Registry)](http://www.iana.org/assignments/vcard-elements/vcard-elements.xhtml)

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.

[BUILD BADGE]: https://img.shields.io/github/workflow/status/jbenner-radham/vcardjs/CI?logo=github
[BUILD PAGE]: https://github.com/jbenner-radham/vcardjs/actions/workflows/ci.yaml
[NODE BADGE]: https://img.shields.io/node/v/@vcard/vcard4-generator?style=flat&logo=nodedotjs
[NODE PAGE]: https://nodejs.org/
[NPM BADGE]: https://img.shields.io/npm/v/@vcard/vcard4-generator?style=flat&logo=npm
[NPM PAGE]: https://www.npmjs.com/package/@vcard/vcard4-generator
