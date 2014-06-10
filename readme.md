# packify

packs up browserify apps by inlining all assets into one html file

```
npm install packify -g
packify index.html > packed.html
```

## how it works

packify will do the following transformations:

- `<img src="foo.png">` -> `<img src="data:...">`
- `<link rel="stylesheet" href="foo.css">` -> `<style> /** styles here **/ </style>`
- `<script src="foo.js">` -> `<script> /** browserified foo.js here **/ </script>`

all transformations are handled by dependencies: [inline-images](http://npmjs.org/inline-images), [inline-styles](http://npmjs.org/inline-styles) and [scriptify](http://npmjs.org/scriptify)

notes:

- `url(foo.png)` inside stylesheets will also get converted to inline data-uris
- only relative URIs will be transformed, e.g. `<script src="http://foo.com/foo.js">` will be ignored

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

