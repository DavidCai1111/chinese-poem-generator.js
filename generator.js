'use strict'
const generator = require('commander')
const pkg = require('./package')

generator.version(pkg.version)

generator
  .command('generate')
  .description('generate a poem for given characters / 根据输入的汉字作诗')
  .option('-b, --beginCharacters <string>', 'begin characters of the output poem / 诗的首几字')
  .option('-f, --firstCharacters <string>', 'first characters for each sentence / 每一句诗的首字')
  .option('-g, --gpu')
  .action(function (opts) {
    ;(async function () {
      const { firstCharacters, beginCharacters, gpu } = opts

      if (gpu) require('@tensorflow/tfjs-node-gpu')
      else require('@tensorflow/tfjs-node')

      if (beginCharacters) {
        console.log(await require('./lib/run').getByBeginWith(beginCharacters)
        )
        return
      }

      console.log(await require('./lib/run').getByFirstChars(firstCharacters))
    })().catch(console.error)
  })

generator.parse(process.argv)
