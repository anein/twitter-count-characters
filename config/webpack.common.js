const webpack = require('webpack');
const helpers = require('./helpers.methods');
const plugins = require('./helpers.plugins');

module.exports = {
  cache: false,
  target: 'web',
  context: helpers.root('src/'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/\.(spec|e2e)\.ts$/],
      },
      {
        test: /\.css$/,
        use: plugins.ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', query: { importLoaders: 1 } },
            { loader: 'postcss-loader', query: { path: { config: 'config/postcss.config.js' } } },
          ],
        }),
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.css'],
  },
  plugins: [
    /**
     * Skip the emitting phase
     */
    new webpack.NoEmitOnErrorsPlugin(),

    /**
     * Defines externals.
     */
    new plugins.ExternalsPlugin({
      type: 'commonjs',
      include: __dirname + '/node_modules',
    }),
  ],
  stats: {
    modules: false,
  },
};
