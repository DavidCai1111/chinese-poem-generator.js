'use strict'
require('@tensorflow/tfjs-node-gpu')
const tf = require('@tensorflow/tfjs')
const path = require('path')
// const model = require('./lib/model')
const process = require('./lib/process')

;(async function () {
  const preprocessResult = await process.readJSONFile(
    path.join(__dirname, './test/data/poet.song.91000.json'),
    200
  )

  // const rnnModel = model.getGeneratorModel(preprocessResult)

  // await model.train(
  //   rnnModel,
  //   preprocessResult.inputs,
  //   preprocessResult.labelsOnehot,
  //   path.join(__dirname, './assets')
  // )

  const rnnModel = await tf.loadLayersModel(`file://${path.join(__dirname, './assets/model.json')}`)

  const chars = '一人'

  const inputs = process.charsToInput(chars, preprocessResult)

  const [predictedOnehot] = rnnModel.predict(tf.tensor(inputs, [1, 18])).arraySync()

  const predictedChar = process.oneHotToChar(predictedOnehot, preprocessResult.charSetArray)

  console.log({ predictedChar })
})().catch(console.error)
