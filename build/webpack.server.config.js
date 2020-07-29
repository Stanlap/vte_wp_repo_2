const PATHS = require('./globals');
const nodeExternals = require('webpack-node-externals')

module.exports = (env, argv) => {
  const serverPath = (argv.mode === 'production') ?
    './src/server/server-prod.js' :
    './src/server/server-dev.js'
  return ({
    entry: {
      server: serverPath,
    },
    output: {
      path: `${PATHS.serv}/`,
      publicPath: '/',
      filename: '[name].js'
    },
    target: 'node',
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false, // if you don't put this is, __dirname
      __filename: false, // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }]
    }
  })
}