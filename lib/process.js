'use strict'
const fs = require('fs')
const hanzi = require('hanzi-tools')

async function readJSONFile (file, maxLen) {
  const result = await readJSON(fs.readFileSync(file, 'utf8'), maxLen)

  return result
}

async function readJSON (json, maxLen) {
  let poetInfoArray = JSON.parse(json)
  const charSet = new Set()
  const charSetArray = []
  const inputSequences = []
  const allParagraphs = []
  let maxParagraphLen = 0
  let allStr = ''

  if (typeof maxLen === 'number') poetInfoArray = poetInfoArray.slice(0, maxLen)

  for (const { paragraphs } of poetInfoArray) {
    const paragraph = paragraphs.join('')

    if (paragraph.length > maxParagraphLen) {
      if (paragraph.length > 200) continue

      maxParagraphLen = paragraph.length
    }

    allStr += paragraph
    allParagraphs.push(paragraph)
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

function charsToInput (chars, { charSetArray, maxParagraphLen }) {
  const input = new Array(maxParagraphLen - 1).fill(0)
  let needTraditionalize = false
  chars = _copyArray(chars)

  for (let i = 0; i < chars.length; i++) {
    let charSetIdx = charSetArray.indexOf(chars[i])

    if (charSetIdx < 0) {
      charSetIdx = charSetArray.indexOf(hanzi.traditionalize(chars[i]))

      if (charSetIdx < 0) throw new Error(`Unkown character: ${chars[i]}`)
      else needTraditionalize = true
    }

    if (needTraditionalize) chars[i] = hanzi.traditionalize(chars[i])
    input[input.length - chars.length + i] = charSetArray.indexOf(chars[i])
  }

  return input
}

function oneHotToChar (onehot, charSetArray) {
  let maxIdx = 0
  let maxValue = onehot[0]

  for (let i = 0; i < onehot.length; i++) {
    if (onehot[i] > maxValue) {
      maxValue = onehot[i]
      maxIdx = i
    }
  }

  return charSetArray[maxIdx]
}

function _copyArray (array) {
  const copy = []

  for (const item of array) copy.push(item)

  return copy
}

module.exports = {
  readJSONFile,
  readJSON,
  charsToInput,
  oneHotToChar
}
