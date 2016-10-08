#! /usr/bin/env node

'use strict'

const program = require('commander')

program.version('0.0.1')

program
  .command('crawlers:create')
  .description('Create crawlers')
  .action(() => {
    require('./crawlers/create')
  })

program
  .command('crawlers:delete-stopped')
  .description('Delete stopped crawlers')
  .action(() => {
    require('./crawlers/delete-stopped')
  })

program
  .command('crawlers:list')
  .description('List crawlers')
  .action(() => {
    require('./crawlers/list')
  })

program
  .command('crawlers:start')
  .description('Start crawlers')
  .action(() => {
    require('./crawlers/start')
  })

program
  .command('crawlers:terminate')
  .description('Terminate crawlers')
  .action(() => {
    require('./crawlers/terminate')
  })

program.parse(process.argv)

