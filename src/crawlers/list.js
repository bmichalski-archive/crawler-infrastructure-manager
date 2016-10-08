'use strict'

const conf = require('./../../conf')
const manager = require('@bmichalski/scaleway-infrastructure-manager')(conf)
const Table = require('cli-table2')

manager
  .listServers(conf.servers.crawlers)
  .then((servers) => {
    const table = new Table({
      head: [ 'Name', 'Present', 'State', 'Id', 'Public IPv4', 'Type', 'Arch' ]
    })

    servers.forEach((server) => {
      let rawData = [
        server.name,
        server.present
      ]

      if (undefined !== server.info) {
        rawData = rawData.concat([
          server.info.state,
          server.info.id,
          null === server.info.public_ip ? null : server.info.public_ip.address,
          server.info.commercial_type,
          server.info.arch
        ])
      }

      const data = rawData.map((value) => {
        return (undefined === value || null === value) ? '-' : value
      })

      table.push(data)
    })

    console.log(table.toString())
  })
