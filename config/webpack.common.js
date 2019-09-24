const webpack = require('webpack');
const helpers = require('./helpers.methods');
const plugins = require('./helpers.plugins');

module.exports = env => {
  const isProduction = !!(env && 'production' in env && env.production === true);

  return {
    devtool: 'none',
    mode: isProduction ? 'production' : 'development',
    cache: isProduction,
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
          use: [
            {
              loader: plugins.MiniCssExtractPlugin.loader,
              options: {
                hmr: isProduction,
              },
            },
            { loader: 'css-loader', query: { importLoaders: 1 } },
            { loader: 'postcss-loader', options: { config: { path: './config/' } } },
          ],
          exclude: [/node_modules/],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.css'],
      alias: {
        '@': helpers.root('src/ts/'),
        '@content': helpers.root('src/ts/content'),
        '@base': helpers.root('src/ts/base'),
      },
    },
    plugins: [
      new plugins.FriendlyErrorsWebpackPlugin(),
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
      env: false,
    },
    optimization: {
      minimize: isProduction,
      minimizer: [isProduction ? new plugins.OptimizeCSSAssetsPlugin({}) : () => {}],
    },
  };
};
