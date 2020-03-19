# chinese-poem-generator.js
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/DavidCai1993/chinese-poem-generator.js.svg?branch=master)](https://travis-ci.org/DavidCai1993/chinese-poem-generator.js)

Chinese poem generator in Node.js, using [TensorFlow.js](https://js.tensorflow.org/).

## Some Examples

```js
node ./generator.js generate -f 一二三四

// Output:
一枝吾已足，鸿鹄谢哀怜。
二妙争开古锦囊，烂然佳句压群芳。
三篇解索诗偿债，一醉那无酒唤愁。
四方争献寿星图，祝公千岁身长健。
```

```js
node ./generator.js generate -f 天下大同

// Output:
天阔此时难借问，地偏何处可偷生。
下危肠无戛，玉在寻月寒金。
大江应好在，流恨几时平。
同问香香起来，悲铁万洒地云。
```

```js
node ./generator.js generate -f 他是沙雕

// Output:
他时拜赐犹能记，此夜伤心更忍看。
是处风烟供翰墨，何妨杖履入村墟。
沙路待看新筑稳，桃阴应念旧蹊深。
雕茸紫境金谁俗辙，前眼奔青边。
```

## How To Use It

### Clone This Repository
```
git clone https://github.com/DavidCai1993/chinese-poem-generator.js.git

cd chinese-poem-generator.js
```

### Install Dependences
```
npm install
```

### Make Some Poems
```
node ./generator.js generate -f <firstCharacters> [--gpu]
```
