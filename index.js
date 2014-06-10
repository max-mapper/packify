var scriptify = require('scriptify')
var styleInliner = require('inline-styles')
var imageInliner = require('inline-images')
var concat = require('concat-stream')
var path = require('path')
var fs = require('fs')
var url = require('url')

module.exports = function(opts, cb) {
  // inline <img> tags
  var html = imageInliner(opts.html)
  
  // inline <script> tags
  opts.selector = opts.selector || 'script'
  var scriptifier = scriptify(opts)
  scriptifier.pipe(concat(inlineStyles))
  scriptifier.on('error', cb)
  scriptifier.write(html)
  scriptifier.end()
  
  function inlineStyles(html) {
    // inline <link rel="stylesheet"> tags
    var inlined = styleInliner(html)
    cb(null, inlined)
  }
}
