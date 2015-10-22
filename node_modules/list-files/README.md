# list-files [![Build Status](https://travis-ci.org/emiljohansson/list-files.svg?branch=master)](https://travis-ci.org/emiljohansson/list-files) [![Coverage Status](https://img.shields.io/coveralls/emiljohansson/list-files/master.svg)](https://coveralls.io/r/emiljohansson/list-files?branch=master)

> Finds all files in a directory and passes them into an array.
> Can specify the name of sub-directory and match a file extension.

## Install

```
npm install list-files
```

## Usage

```js
var find = require('list-files');

find(function(result) {
    console.log(result);
    //=> './dirname/a.js'
    //=> './dirname/b.js'
}, {
    dir: 'dirname',
    name: 'js'
});
```

## API
### find(callback, [argv])
#### callback

Type: `function`

Called once the search is complete.

#### argv

Type: `object`

Optional options. Possible options 'dir', 'name' and 'exclude'.

## License

MIT © [Emil Johansson](http://emiljohansson.se)
