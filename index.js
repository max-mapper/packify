var scriptify = require('scriptify')
var styleInliner = require('inline-styles')
var concat = require('concat-stream')
var path = require('path')
var fs = require('fs')
var url = require('url')

module.exports = function(opts, cb) {
  opts.selector = opts.selector || 'script'
  opts.args = ['-t', 'brfs']
  var scriptifier = scriptify(opts)
  
  scriptifier.pipe(concat(inlineStyles))
  scriptifier.on('error', cb)
  scriptifier.write(opts.html)
  scriptifier.end()
  
  function inlineStyles(html) {
    var inlined = styleInliner(html)
    cb(null, inlined)
  }
}
