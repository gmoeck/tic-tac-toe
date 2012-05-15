#!/usr/bin/env node
var modulr = require('modulr');
var fs = require('fs');

var packageInfo = JSON.parse(fs.readFileSync('package.json'), 'utf8');
modulr.build('main', packageInfo.modulr, function(err, results) {
  if(err)
    throw err;
  fs.writeFileSync('public/application.js', results.output, 'utf8');
});
