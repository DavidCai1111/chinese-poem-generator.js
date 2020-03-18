/* global describe it */
'use strict'
const fs = require('fs')
const path = require('path')
const assert = require('power-assert')
const process = require('../lib/process')

describe('process', function () {
  const json = fs.readFileSync(path.join(__dirname, './data/poet.song.91000.json'), 'utf8')

  it('readJSON', async function () {
    const result = await process.readJSON(json)

    assert.strictEqual(typeof result.allStr, 'string')
    assert.strictEqual(result.allStr.startsWith('扣橈泛澄虚'), true)
    assert.strictEqual(result.charSet.has('扣'), true)
    assert.strictEqual(result.charSet.has('，'), true)
    assert.strictEqual(result.charSet.has('。'), true)
    assert.strictEqual(result.charSet.has('扣橈'), false)
    assert.strictEqual(result.charSet.size > 100, true)
    assert.strictEqual(result.maxParagraphLen, 27)
  })
})
