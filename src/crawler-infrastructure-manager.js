#! /usr/bin/env node

'use strict'

const program = require('commander')
const _ = require('lodash')

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

program
  .command('scaleway:images:list')
  .description('List available Scaleway images')
  .option('-n, --name <name>', 'Name contains')
  .option('-a, --architecture <architecture>', 'Architecture contains')
  .option('-k, --kernel <kernel>', 'Default bootscript kernel contains')
  .action((options) => {
    const filters = {}

    if (undefined !== options.name && _.isString(options.name)) {
      filters.name = options.name
    }

    if (undefined !== options.architecture) {
      filters.architecture = options.architecture
    }

    if (undefined !== options.kernel) {
      filters.kernel = options.kernel
    }

    require('./scaleway/images/list')(filters)
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
