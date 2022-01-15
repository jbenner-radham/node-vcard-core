vcard-core
==========
![CI Status](https://github.com/jbenner-radham/node-vcard-core/actions/workflows/ci.yaml/badge.svg)

A library for working with [vCards](https://en.wikipedia.org/wiki/VCard).

Heads Up!
---------
This is still very much a WIP project and is __*not*__ feature complete.

Building
--------
```sh
$ npm run build
```

Testing
-------
```sh
$ npm test
```

Usage
-----
```ts
// NOTE: This module is not yet available from npm!
import Vcard, { VcardConfig } from '@vcard/core';

const config: VcardConfig = {
    fn: 'Captain Awesome',
    email: 'hello@example.com',
    url: 'http://www.example.com/'
};
const vcard = new Vcard(config);

vcard.toString();
// >> BEGIN:VCARD
// >> VERSION:4.0
// >> EMAIL:hello@example.com
// >> FN:Captain Awesome
// >> URL:http://www.example.com/
// >> END:VCARD
```

To-Do
-----
- [ ] Properties
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
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
  - [x] `ANNIVERSARY`
    - [x] Line Folding
    - [x] Value Escaping _(for `text` type only)_
    - [x] `VALUE` Parameter
    - [x] `ALTID` Parameter
    - [x] `CALSCALE` Parameter _(for `date-and-or-time` type only)_
  - [x] `BDAY`
    - [x] Line Folding
    - [x] Value Escaping _(for `text` type only)_
    - [x] `VALUE` Parameter
    - [x] `ALTID` Parameter
    - [x] `CALSCALE` Parameter _(for `date-and-or-time` type only)_
    - [x] `LANGUAGE` Parameter _(for `text` type only)_
  - [x] `BEGIN`
    - [x] No Parameters
  - [x] `CALADRURI`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `CALURI`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `CATEGORIES`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
    - [x] `ALTID` Parameter
    - [ ] Implement Constructor `Array` Argument Support
  - [x] `CLIENTPIDMAP`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] No Parameters
    - [x] No `VALUE` Parameter
    - [ ] Implement Constructor `Array` Argument Support
  - [x] `EMAIL`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `END`
    - [x] No Parameters
  - [x] `FBURL`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
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
    - [x] `PREF` Parameter _(need to validate!!!)_
  - [x] `GENDER`
    - [x] Line Folding
    - [ ] Value Escaping
    - [x] `VALUE` Parameter
    - [ ] Implement Constructor `Array` Argument Support
  - [x] `GEO`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `IMPP`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `KEY`
    - [x] Line Folding
    - [x] Value Escaping _(for `text` type only)_
    - [x] `VALUE` Parameter
    - [x] `MEDIATYPE` Parameter _(for `URI` type only)_
    - [x] `ALTID` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
  - [x] `KIND`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
  - [x] `LANG`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `ALTID` Parameter
    - [x] `TYPE` Parameter
  - [x] `LOGO`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] `VALUE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `MEMBER`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `ALTID` Parameter
    - [x] `MEDIATYPE` Parameter
  - [x] `N`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `SORT-AS` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `ALTID` Parameter
  - [x] `NICKNAME`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `TYPE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `ALTID` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
  - [x] `NOTE`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `ORG`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `SORT-AS` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PID` Parameter
    - [x] `TYPE` Parameter
  - [x] `PHOTO`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] `VALUE` Parameter
    - [x] `ALTID` Parameter
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `PID` Parameter
  - [x] `PRODID`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
  - [x] `RELATED`
    - [x] Line Folding
    - [x] Value Escaping _(for `text` type only)_
    - [x] `VALUE` Parameter
    - [x] `MEDIATYPE` Parameter _(for `URI` type only)_
    - [x] `LANGUAGE` Parameter _(for `text` type only)_
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `ALTID` Parameter
    - [x] `TYPE` Parameter
  - [x] `REV`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] `VALUE` Parameter
  - [x] `ROLE`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `SOUND`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] `VALUE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `SOURCE`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `ALTID` Parameter
    - [x] `MEDIATYPE` Parameter
  - [x] `TEL`
    - [x] Line Folding
    - [x] Value Escaping _(for `text` type only)_
    - [x] `VALUE` Parameter
    - [x] `MEDIATYPE` Parameter _(for `URI` type only)_
    - [x] `TYPE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `ALTID` Parameter
  - [x] `TITLE`
    - [x] Line Folding
    - [x] Value Escaping
    - [x] `VALUE` Parameter
    - [x] `LANGUAGE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `ALTID` Parameter
    - [x] `TYPE` Parameter
  - [x] `TZ`
    - [x] Line Folding
    - [x] Value Escaping _(for `text` type only)_
    - [x] `VALUE` Parameter
    - [x] `ALTID` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
  - [x] `UID`
    - [x] Line Folding
    - [x] Value Escaping _(for `text` type only)_
    - [x] `VALUE` Parameter
  - [x] `URL`
    - [x] Line Folding
    - [x] No Value Escaping
    - [x] `VALUE` Parameter
    - [x] `PID` Parameter
    - [x] `PREF` Parameter _(need to validate!!!)_
    - [x] `TYPE` Parameter
    - [x] `MEDIATYPE` Parameter
    - [x] `ALTID` Parameter
  - [x] `VERSION`
    - [x] No Parameters
  - [ ] `XML`
    - [ ] Line Folding
    - [ ] Value Escaping
    - [ ] `VALUE` Parameter
    - [ ] `ALTID` Parameter

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
- [Additional Data Related to an Emergency Call § vCard Parameter Value Registration](https://datatracker.ietf.org/doc/html/rfc7852/#section-11.7)
- [vCard Format Extensions: ICANN Extensions for the Registration Data Access Protocol (RDAP)](https://datatracker.ietf.org/doc/html/rfc8605/)
- [vCard Format Extensions: Representing vCard Extensions Defined by the Open Mobile Alliance (OMA) Converged Address Book (CAB) Group](https://datatracker.ietf.org/doc/html/rfc6715/)
- [vCard Format Extensions: Place of Birth, Place and Date of Death](https://datatracker.ietf.org/doc/html/rfc6474/)
- [vCard Elements (IANA Protocol Registry)](http://www.iana.org/assignments/vcard-elements/vcard-elements.xhtml)

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.
