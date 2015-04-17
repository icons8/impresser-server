#!/usr/bin/env node

'use strict';

var
  yargs = require('yargs'),
  Application = require('../lib/Application'),

  argv = yargs
    .usage('Usage: $0 [config.json[, ...config.json]]')
    .help('h')
    .alias('h', 'help')
    .epilog('impress (https://github.com/icons8/impress)')
    .argv;

new Application(argv._).run();