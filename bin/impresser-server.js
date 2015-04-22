#!/usr/bin/env node

'use strict';

var
  yargs = require('yargs'),
  Application = require('../lib/Application'),

  argv = yargs
    .usage('Usage: $0 [config.json[, ...config.json]] [impresser options]')
    .help('h')
    .alias('h', 'help')
    .epilog('impresser-server (https://github.com/icons8/impresser-server)')
    .argv,

  options;

options = argv;
options.config = argv._.concat(options.config);

new Application(options).run();