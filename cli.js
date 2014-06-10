#!/usr/bin/env node

var fs = require('fs')
var packer = require('./')

var args = process.argv.slice(2)
var file = args.slice(0, 1)[0]

var opts = {
  html: fs.readFileSync(file)
}

opts.args = args.slice(1)

packer(opts, function(err, packed) {
  console.log(packed.toString())
})
