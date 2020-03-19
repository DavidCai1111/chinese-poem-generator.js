'use strict'
const generator = require('commander')
const pkg = require('./package')

generator.version(pkg.version)

generator
  .command('generate')
  .description('generate a poem for given characters / 根据给予的汉字作诗')
  .option('-b, --beiginCharacters <string>', 'begin characters of the output poem / 输出诗句的首几字')
  .option('-f, --firstCharacters <string>', 'first characters for each sentence / 每一句诗的首字')
  .option('-g, --gpu')
  .action(function (opts) {
    ;(async function () {
      const { firstCharacters, beiginCharacters, gpu } = opts

      if (gpu) require('@tensorflow/tfjs-node-gpu')
      else require('@tensorflow/tfjs-node')

      if (beiginCharacters) {
        console.log(await require('./lib/run').getByBeginWith(beiginCharacters)
        )
        return
      }

      console.log(await require('./lib/run').getByFirstChars(firstCharacters))
    })().catch(console.error)
  })

generator.parse(process.argv)
