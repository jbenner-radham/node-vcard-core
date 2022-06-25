@vcard/vcard4-meta
==================
[![CI Status][BUILD BADGE]][BUILD PAGE]

A [vCard 4](https://datatracker.ietf.org/doc/html/rfc6350) module which provides data about the format.

Install
-------
```sh-session
npm install @vcard/vcard4-meta
```

Usage
-----
```js
import { EOL, FOLD_CONTINUATION_CHAR, MAX_OCTETS_PER_LINE } from '@vcard/vcard4-meta';
```

Building
--------
From the monorepo root:

```sh-session
npx lerna --scope @vcard/vcard4-meta run build
```

Testing
--------
From the monorepo root:

```sh-session
npm test
```

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.

[BUILD BADGE]: https://github.com/jbenner-radham/vcardjs/actions/workflows/ci.yaml/badge.svg
[BUILD PAGE]: https://github.com/jbenner-radham/vcardjs/actions/workflows/ci.yaml
