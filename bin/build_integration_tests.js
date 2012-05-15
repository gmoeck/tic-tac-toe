#!/usr/bin/env node
var modulr = require('modulr');
var fs = require('fs');

var packageInfo = JSON.parse(fs.readFileSync('spec/integration/package.json'), 'utf8');
modulr.build('spec/integration/runner/all_tests', packageInfo.modulr, function(err, results) {
  if(err)
    throw err;
  fs.writeFileSync('spec/integration/runner/built_tests.js', results.output, 'utf8');
});

