import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: './lib/index.esm.js',
      format: 'esm',
    },
    plugins: [typescript(), json()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: './lib/index.js',
      format: 'cjs',
    },
    plugins: [typescript(), json()],
  },
]
