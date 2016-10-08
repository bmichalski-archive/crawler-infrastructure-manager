'use strict'

const conf = require('./../../conf')
const manager = require('@bmichalski/scaleway-infrastructure-manager')(conf)

module.exports = (doLocal) => {
  manager.doLocal(conf.servers.crawlers, doLocal)
}
