const helpers = require('./helpers.methods');
const plugins = require('./helpers.plugins');
const webpackCommonConfig = require('./webpack.common');
//
module.exports = [
  plugins.webpackMerge(webpackCommonConfig, {
    entry: {
      popup: ['./ts/popup.ts'],
      // tweetdeck: helpers.root('ts/content', 'tweetdeck.ts'),
      // web: helpers.root('ts/content', 'web.ts'),
      // 'scripts/web': helpers.root('ts/content/scripts', 'web.ts'),
    },

    output: {
      path: helpers.root('build/'),
      filename: 'js/[name].js',
    },

    resolve: {
      alias: {
        '@': helpers.root('src/ts/'),
      },
    },
  }),
  plugins.webpackMerge(webpackCommonConfig, {
    entry: {
      popup: './css/popup.css',
      content: './css/content.css',
    },

    output: {
      path: helpers.root('build/'),
      filename: 'css/[name].css',
    },

    plugins: [
      new plugins.ExtractTextPlugin('css/[name].css'),
      new plugins.HtmlWebpackPlugin({
        filename: 'html/popup.html',
        template: './html/popup.html',
        inject: false,
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          html5: true,
          removeComments: true,
          removeEmptyAttributes: true,
        },
      }),
      /**
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       */
      new plugins.CopyWebpackPlugin(
        [
          {
            from: 'manifest.json',
          },
          {
            from: 'img',
            to: 'img',
          },
          // {
          //   from: 'html', to: "html"
          // },
          // {
          //   from: 'css', to: "css"
          // },
          {
            from: '../_locales',
            to: '_locales',
          },
        ],
        {
          // By default, we only copy modified files during
          // a watch or webpack-dev-server build. Setting this
          // to `true` copies all files.
          copyUnmodified: true,
        }
      ),
    ],
  }),
];
