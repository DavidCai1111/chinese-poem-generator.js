'use strict'
const fs = require('fs')

async function readJSONFile (file) {
  const result = await readJSON(fs.readFileSync(file, 'utf8'))

  return result
}

async function readJSON (json) {
  const poetInfoArray = JSON.parse(json)
  const charSet = new Set()
  const charSetArray = []
  const inputSequences = []
  const allParagraphs = []
  let maxParagraphLen = 0
  let allStr = ''

  for (const { paragraphs } of poetInfoArray) {
    for (const paragraph of paragraphs) {
      if (paragraph.length > maxParagraphLen) {
        maxParagraphLen = paragraph.length
      }

      allStr += paragraph
      allParagraphs.push(paragraph)
    }
  }

  for (const char of allStr) charSet.add(char)
  for (const char of charSet.values()) charSetArray.push(char)

  for (const paragraph of allParagraphs) {
    for (let i = 2; i <= paragraph.length; i++) {
      const sequence = new Array(maxParagraphLen).fill(0)

      for (let j = 0; j < i; j++) {
        sequence[sequence.length - i + j] = charSetArray.indexOf(paragraph[j])
      }

      inputSequences.push(sequence)
    }
  }

  const inputs = []
  const labels = []
  const labelsOnehot = []

  for (const inputSequence of inputSequences) {
    inputs.push(inputSequence.slice(0, -1))

    const label = inputSequence.slice(-1)[0]
    labels.push(label)

    const labelOnehot = new Array(charSetArray.length).fill(0)
    labelOnehot[label] = 1
    labelsOnehot.push(labelOnehot)
  }

  return {
    allStr,
    charSet,
    charSetArray,
    maxParagraphLen,
    inputSequences,
    inputs,
    labels,
    labelsOnehot
  }
}

module.exports = {
  readJSONFile,
  readJSON
}
