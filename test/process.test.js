/* global describe it */
'use strict'
const fs = require('fs')
const path = require('path')
const assert = require('power-assert')
const process = require('../lib/process')

describe('process', function () {
  it('readJSON', async function () {
    const json = fs.readFileSync(path.join(__dirname, './data/poet.song.91000.json'), 'utf8')
    const result = await process.readJSON(json)

    assert.strictEqual(typeof result, 'string')
    assert.strictEqual(result.startsWith('扣橈泛澄虚'), true)
  })
})
