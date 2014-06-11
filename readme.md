# packify

packs up browserify apps by inlining all assets into one html file

```
npm install packify -g
packify index.html > packed.html
```

![dat](http://img.shields.io/badge/Development%20sponsored%20by-dat-green.svg?style=flat)

## how it works

packify will do the following transformations:

- `<img src="foo.png">` -> `<img src="data:...">`
- `<link rel="stylesheet" href="foo.css">` -> `<style> /** styles here **/ </style>`
- `<script src="foo.js">` -> `<script> /** browserified foo.js here **/ </script>`
- `background-image { url(foo.png) }` -> `background-image { url('data:...') }`

all transformations are handled by dependencies: [inline-images](http://npmjs.org/inline-images), [inline-styles](http://npmjs.org/inline-styles), [imageinliner](https://www.npmjs.org/package/imageinliner) and [scriptify](http://npmjs.org/scriptify)

notes:

- `url(foo.png)` inside stylesheets will also get converted to inline data-uris
- only relative URIs will be transformed, e.g. `<script src="http://foo.com/foo.js">` will be ignored

## example

the [dat-editor](https://github.com/maxogden/dat-editor) module/application uses this.

before packify: https://github.com/maxogden/dat-editor/blob/master/index.html
after packify: https://github.com/maxogden/dat-editor/blob/master/prebuilt.html

`prebuilt.html` is generated by this npm command https://github.com/maxogden/dat-editor/blob/master/package.json#L8 (note the `brfs` transform https://github.com/maxogden/dat-editor/blob/master/package.json#L28-L32)

## usage

### javascript

```js
var packify = require('packify')

var opts = {
  html: "<html> ... your html here... </html>",
  args: ['arguments', 'for', 'browserify'],
  selector: 'script' // css selector passed to scriptify for it to select elements to browserify
}

packify(opts, function(err, packed) {
  console.log(packed.toString())
})
```

### CLI

```
packify <path-to-html-file>
```

when using on the CLI any additional arguments beyond the HTML file will be passed straight to browserify, e.g. 

```
packify index.html -t brfs
```

will run browserify like `browserify -t brfs`

