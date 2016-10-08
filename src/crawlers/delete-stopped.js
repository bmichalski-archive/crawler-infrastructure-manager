'use strict'

const conf = require('./../../conf')
const manager = require('@bmichalski/scaleway-infrastructure-manager')(conf)

manager.deleteStoppedServers(conf.servers.crawlers)
