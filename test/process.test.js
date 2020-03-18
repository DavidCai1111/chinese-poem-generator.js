/* global describe it */
'use strict'
require('@tensorflow/tfjs-node')
const fs = require('fs')
const path = require('path')
const assert = require('power-assert')
const process = require('../lib/process')
const model = require('../lib/model')

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
    assert.strictEqual(result.inputs.length, result.inputSequences.length)
    assert.strictEqual(result.inputs[10].length, result.inputSequences[10].length - 1)
    assert.strictEqual(result.labels.length, result.inputs.length)
    assert.strictEqual(result.labelsOnehot[50][48], 1)
    assert.strictEqual(result.labelsOnehot[50].length, result.charSetArray.length)

    model.getGeneratorModel(result)
  })
})
