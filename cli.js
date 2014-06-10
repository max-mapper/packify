#!/usr/bin/env node

var fs = require('fs')
var packer = require('./')

var opts = {
  html: fs.readFileSync(process.argv[2])
}

packer(opts, function(err, packed) {
  console.log(packed.toString())
})
