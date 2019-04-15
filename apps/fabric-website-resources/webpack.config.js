let path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'office-ui-fabric-react';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = [
  ...resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
    entry: { [BUNDLE_NAME]: './lib/index.bundle.js' },

    output: {
      libraryTarget: 'var',
      library: 'Fabric'
    },

    externals: [
      {
        react: 'React'
      },
      {
        'react-dom': 'ReactDOM'
      }
    ],

    resolve: {
      alias: {
        '@uifabric/legacy/src': path.join(__dirname, '../../packages/legacy/src'),
        '@uifabric/legacy/lib': path.join(__dirname, '../../packageslegacy/lib'),
        'office-ui-fabric-react/src': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
        'office-ui-fabric-react/lib': path.resolve(__dirname, '../../packages/office-ui-fabric-react/lib'),
        'Props.ts.js': 'Props',
        'Example.tsx.js': 'Example'
      }
    }
  }),
  require('./webpack.serve.config')
];
