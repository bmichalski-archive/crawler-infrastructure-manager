'use strict'

const conf = require('./../../../conf')
const manager = require('@bmichalski/scaleway-infrastructure-manager')(conf)
const Table = require('cli-table')

module.exports = (filters) => {
  const name = undefined === filters.name ? undefined : filters.name.toLocaleLowerCase()
  const architecture = undefined === filters.architecture ? undefined : filters.architecture.toLocaleLowerCase()
  const kernel = undefined === filters.kernel ? undefined : filters.kernel.toLocaleLowerCase()

  manager
    .getImages()
    .then((images) => {
      const filteredImages = []

      images.forEach((image) => {
        if (
          (undefined === name || image.name.toLocaleLowerCase().indexOf(name) !== -1)
          && (undefined === architecture || image.arch.toLocaleLowerCase().indexOf(architecture) !== -1)
          && (undefined === kernel || image.default_bootscript.kernel.indexOf(kernel) !== -1)
        ) {
          filteredImages.push(image)
        }
      })

      const compareStringsAsc = (strA, strB) => {
        strA = strA.toLocaleLowerCase()
        strB = strB.toLocaleLowerCase()

        if (strA < strB) {
          return -1
        }

        if (strA > strB) {
          return 1
        }

        return 0
      }

      filteredImages.sort((imageA, imageB) => {
        let val

        val = compareStringsAsc(imageA.name, imageB.name)

        if (0 === val) {
          val = compareStringsAsc(imageA.arch, imageB.arch)

          if (0 === val) {
            return compareStringsAsc(imageA.default_bootscript.kernel, imageB.default_bootscript.kernel)
          } else {
            return val
          }
        } else {
          return val
        }
      })

      const table = new Table({
        head: [ 'Name', 'Architecture', 'Kernel', 'Id' ]
      })

      filteredImages.forEach((image) => {
        table.push([ image.name, image.arch, image.default_bootscript.kernel, image.id ])
      })

      console.log(table.toString())
    })
}