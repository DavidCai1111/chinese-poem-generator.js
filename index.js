'use strict'
require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const path = require('path')
const model = require('./lib/model')
const process = require('./lib/process')

;(async function () {
  const preprocessResult = await process.readJSONFile(path.join(__dirname, './test/data/poet.song.91000.json'))

  const rnnModel = model.getGeneratorModel(preprocessResult)

  const dataSet = tf.data.generator(function () {
    let i = 0
    const batchSize = 3000

    const iterator = {
      next: () => {
        const value = {
          xs: tf.tensor(preprocessResult.inputs.slice(i, i + batchSize)),
          ys: tf.tensor(preprocessResult.labelsOnehot.slice(i, i + batchSize))
        }

        i = i + batchSize

        const done = i >= preprocessResult.labelsOnehot.length

        return { value, done }
      }
    }

    return iterator
  })

  await rnnModel.fitDataset(
    dataSet,
    { epochs: 100, verbose: 1 }
  )

  await rnnModel.save(`file://${path.join(__dirname, './assets')}`)
})().catch(console.error)

