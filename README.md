vcard.js
========
[![CI Status][BUILD BADGE]][BUILD PAGE]

A suite for working with [vCards](https://en.wikipedia.org/wiki/VCard).

Heads Up!
---------
This repository has been deprecated and all current work on this project is now taking place [here](https://github.com/vcardjs). The monorepo paradigm just wasn't working for how I wanted to do things so now everything is centralized under a GitHub organization with multiple repos.

~~This is still very much a WIP project and is _**not**_ feature complete.~~

~~Currently only vCard 4.0 is supported but support for other versions is planned for the future.
vCard generation is complete, work is currently being done on parsing.~~

Testing
-------
```sh
npm test
```

Building
--------
```sh
npm run build
```

Cleaning Build Artifacts
------------------------
```sh
npm run clean
```

Reference
---------
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

[BUILD BADGE]: https://github.com/jbenner-radham/vcardjs/actions/workflows/ci.yaml/badge.svg
[BUILD PAGE]: https://github.com/jbenner-radham/vcardjs/actions/workflows/ci.yaml
