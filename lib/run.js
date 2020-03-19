'use strict'
const path = require('path')
const tf = require('@tensorflow/tfjs')
const hanzi = require('hanzi-tools')
const process = require('./process')

async function getByFirstChars (firstChars) {
  const preprocessResult = await process.readJSONFile(
    path.join(__dirname, '../test/data/poet.song.91000.json'),
    200
  )

  const rnnModel = await tf.loadLayersModel(`file://${path.join(__dirname, '../assets/model.json')}`)

  let chars = firstChars[0]
  const results = []

  for (let j = 0; j < firstChars.length; j++) {
    for (let i = 1; i <= preprocessResult.maxParagraphLen - 1; i++) {
      const inputs = process.charsToInput(chars, preprocessResult)

      const [predictedOnehot] = await rnnModel.predict(
        tf.tensor(inputs, [1, 18])
      ).arraySync()

      const predictedChar = process.oneHotToChar(
        predictedOnehot,
        preprocessResult.charSetArray
      )

      chars += predictedChar

      if (predictedChar === '。') {
        results.push(chars)
        chars = firstChars[j + 1]
        break
      }
    }
  }

  return results.map((result) => hanzi.simplify(result)).join('\n')
}

async function getByBeginWith (beginChars, sentenceLength = 8) {
  const preprocessResult = await process.readJSONFile(
    path.join(__dirname, '../test/data/poet.song.91000.json'),
    200
  )

  const rnnModel = await tf.loadLayersModel(`file://${path.join(__dirname, '../assets/model.json')}`)

  let chars = beginChars
  const results = []

  for (let j = 0; j < sentenceLength; j++) {
    for (let i = 1; i <= preprocessResult.maxParagraphLen - 1; i++) {
      const inputs = process.charsToInput(chars, preprocessResult)

      const [predictedOnehot] = await rnnModel.predict(
        tf.tensor(inputs, [1, 18])
      ).arraySync()

      const predictedChar = process.oneHotToChar(
        predictedOnehot,
        preprocessResult.charSetArray
      )

      chars += predictedChar

      if (predictedChar === '。') {
        results.push(chars)
        break
      }
    }
  }

  return results.map((result) => hanzi.simplify(result)).join('\n')
}

module.exports = {
  getByFirstChars,
  getByBeginWith
}
