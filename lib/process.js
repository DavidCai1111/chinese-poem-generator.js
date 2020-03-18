'use strict'
const fs = require('fs')

async function readJSONFile (file) {
  const result = await readJSON(fs.readFileSync(file, 'utf8'))

  return result
}

async function readJSON (json) {
  const poetInfoArray = JSON.parse(json)
  let result = ''

  for (const { paragraphs } of poetInfoArray) {
    for (const paragraph of paragraphs) {
      result += paragraph
    }
  }

  return result
}

module.exports = {
  readJSONFile,
  readJSON
}
