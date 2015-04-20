#!/usr/bin/env node

'use strict';

var
  yargs = require('yargs'),
  Application = require('../lib/Application'),

  argv = yargs
    .usage('Usage: $0 [config.json[, ...config.json]] [impress options]')
    .help('h')
    .alias('h', 'help')
    .epilog('impress (https://github.com/icons8/impress)')
    .argv,

  options;

options = argv;
options.config = argv._.concat(options.config);

new Application(options).run();