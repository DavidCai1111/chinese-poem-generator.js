# chinese-poem-generator.js
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/DavidCai1993/chinese-poem-generator.js.svg?branch=master)](https://travis-ci.org/DavidCai1993/chinese-poem-generator.js)

[WIP] Chinese poem generator in Node.js, using [TensorFlow.js](https://js.tensorflow.org/).

## Some Examples

```js
node ./generator.js generate -b 天下大同

// Output:
天下大同怯下，坐看烟击横麻草群。
风多云吹树，寒啬前无归归临。
直词赐锦渔醅，唯摩壁畔夸。
何国苍下下滉千千，着使独暗上上归。
```

```js
node ./generator.js generate -b 一二三四

// Output:
一二三四芬聊荒，只有欢日病烟。
莫知东无可尊，经前风北心开。
一见疏敞落金郡，醉色砧向笑石。
姚门忽辞酌，一朝风月春耕。
```

```js
node ./generator.js generate -b 他是沙雕

// Output:
他是沙雕金捧白环，欢今成水旧穷。
慨歌逸任美，授简梁园愧乏才。
陈底不复迷，反复如转烛。
请君听钟鱼，尚想吹紫玉。
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
node ./generator.js generate -b <beiginCharacters> [--gpu]
```
