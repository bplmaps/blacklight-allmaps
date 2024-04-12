'use strict'

import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';

const path = require('path')

const BUNDLE = process.env.BUNDLE === 'true'
const ESM = process.env.ESM === 'true'

const fileDest = `blacklight-allmaps${ESM ? '.esm' : ''}`
const external = []
const globals = {}

let includePathOptions = {
  include: {},
  paths: ['app/javascript'],
  external: [],
  extensions: ['.js']
};

const rollupConfig = {
  input: path.resolve(__dirname, `app/javascript/blacklight/allmaps/index.js`),
  output: {
    file: path.resolve(__dirname, `app/assets/javascripts/blacklight/allmaps/${fileDest}.js`),
    format: ESM ? 'esm' : 'umd',
    globals,
    generatedCode: 'es2015'
  },
  external,
  plugins: [
    includePaths(includePathOptions),
    nodeResolve(),
    commonjs()
  ]
}

if (!ESM) {
  rollupConfig.output.name = 'Blacklight'
}

module.exports = rollupConfig