'use strict'
const generator = require('commander')
const pkg = require('./package')

generator.version(pkg.version)

generator
  .command('generate')
  .description('generate an acrostic poem for given headers / 根据给予的输入作藏头诗')
  .option('-f, --firstCharacters <string>', 'first characters for each sentence / 每一句诗的首字')
  .option('-g, --gpu')
  .action(function (opts) {
    ;(async function () {
      const { firstCharacters, gpu } = opts

      if (gpu) require('@tensorflow/tfjs-node-gpu')
      else require('@tensorflow/tfjs-node')

      const poem = await require('./lib/run').getByFirstChars(firstCharacters)

      console.log(poem)
    })().catch(console.error)
  })

generator.parse(process.argv)
