'use strict'

const conf = require('./../../conf')
const manager = require('@bmichalski/scaleway-infrastructure-manager')(conf)
const Table = require('cli-table2')
const util = require('util')

module.exports = (until) => {
  let waitUntilAll

  if ('running' === until) {
    waitUntilAll = (server) => {
      return undefined !== server && 'running' === server.state
    }
  } else if ('stopped' === until) {
    waitUntilAll = (server) => {
      return undefined !== server && 'stopped' === server.state
    }
  } else if ('present' === until) {
    waitUntilAll = (server) => {
      return undefined !== server
    }
  } else if ('absent' === until) {
    waitUntilAll = (server) => {
      return undefined === server
    }
  } else {
    throw new Error(util.format('Unsupported until parameter "%s", supported values are %j', until, [ 'running', 'stopped', 'present', 'absent' ]))
  }

  let previousOutput

  manager
    .waitUntil(
      waitUntilAll,
      conf.servers.crawlers,
      (servers) => {
        const table = new Table({
          head: [ 'Name', 'Present', 'State', 'Waiting for (s)' ]
        })

        servers.forEach((server) => {
          table.push([
            server.name,
            server.present,
            undefined === server.info ? '' : server.info.state,
            server.waitingFor
          ])
        })

        if (undefined !== previousOutput) {
          //Clearing table
          const lines = previousOutput.split('\n')
          const countLines = lines.length
          const getCursorBack = countLines

          process.stdout.write(String.fromCharCode(27) + '[' + getCursorBack + 'A');

          //Replace table content with whitespaces
          lines.forEach((line) => {
            console.log(' '.repeat(line.length))
          })

          process.stdout.write(String.fromCharCode(27) + '[' + getCursorBack + 'A');
        }

        const tableStr = table.toString()

        console.log(tableStr)

        previousOutput = tableStr
      }
    )
}
