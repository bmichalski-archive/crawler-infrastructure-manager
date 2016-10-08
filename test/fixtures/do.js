'use strict'

const Promise = require('bluebird')
const exec = require('child_process').exec
const util = require('util')

module.exports = (server) => {
  return new Promise((resolve) => {
    //If possible you should not do that in production
    //Maybe memorize the host key the first time we connect
    const remoteCommand = util.format(
      "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@%s 'hostname && uptime'",
      server.public_ip.address
    )

    exec(remoteCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)

        return resolve()
      }

      console.log(stdout, stderr)

      return resolve()
    })
  })
}