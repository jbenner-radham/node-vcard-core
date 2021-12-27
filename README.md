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
  - [x] `ANNIVERSARY`
  - [x] `BDAY`
  - [x] `BEGIN`
  - [x] `CALADRURI`
  - [x] `CALURI`
  - [x] `CATEGORIES`
  - [ ] `CLIENTPIDMAP`
  - [x] `EMAIL`
  - [x] `END`
  - [x] `FBURL`
  - [x] `FN`
  - [x] `GENDER`
  - [x] `GEO`
  - [x] `IMPP`
  - [x] `KEY`
  - [x] `KIND`
  - [x] `LANG`
  - [x] `LOGO`
  - [x] `MEMBER`
  - [x] `N`
  - [x] `NICKNAME`
  - [x] `NOTE`
  - [ ] `ORG`
  - [x] `PHOTO`
  - [ ] `PRODID`
  - [ ] `RELATED`
  - [ ] `REV`
  - [x] `ROLE`
  - [ ] `SOUND`
  - [ ] `SOURCE`
  - [ ] `TEL`
  - [x] `TITLE`
  - [ ] `TZ`
  - [ ] `UID`
  - [x] `URL`
  - [x] `VERSION`
  - [ ] `XML`
- [ ] Parameters
  - [ ] `ALTID`
  - [ ] `CALSCALE`
  - [ ] `GEO`
  - [ ] `LANGUAGE`
  - [ ] `MEDIATYPE`
  - [ ] `PID`
  - [ ] `PREF`
  - [ ] `SORT-AS`
  - [ ] `TYPE`
  - [ ] `TZ`
  - [ ] `VALUE`

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
