'use strict'
const tf = require('@tensorflow/tfjs')

function getGeneratorModel ({ maxParagraphLen, charSetArray }) {
  const model = tf.sequential()

  model.add(tf.layers.embedding({
    inputDim: charSetArray.length,
    outputDim: 100,
    inputLength: maxParagraphLen - 1
  }))

  model.add(tf.layers.bidirectional({
    layer: tf.layers.lstm({
      units: 150,
      returnSequences: true
    })
  }))

  model.add(tf.layers.dropout({
    rate: 0.2
  }))

  model.add(tf.layers.lstm({
    units: 100
  }))

  model.add(tf.layers.dense({
    units: Math.ceil(charSetArray.length / 2),
    activation: 'relu',
    kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
  }))

  model.add(tf.layers.dense({
    units: charSetArray.length,
    activation: 'softmax'
  }))

  model.compile({
    loss: 'categoricalCrossentropy',
    optimizer: 'adam',
    metrics: ['accuracy']
  })

  model.summary()

  return model
}

module.exports = {
  getGeneratorModel
}
