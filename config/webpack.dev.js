const helpers = require('./helpers.methods');
const plugins = require('./helpers.plugins');
const configCommon = require('./webpack.common');
//

const configScripts = {
  name: 'Config Content',
  entry: {
    tweetdeck: ['./ts/tweetdeck.ts'],
    web: ['./ts/web.ts'],
    'scripts/web': ['./ts/scripts/web.ts'],
  },

  output: {
    path: helpers.root('build/'),
    filename: 'js/[name].js',
  },

  plugins: [new plugins.ExtensionReloader()],
};

const configPopupAndAssets = {
  name: 'Config Popup and Assets',
  entry: {
    popup: ['./ts/popup.ts', './css/popup.css'],
    content: ['./css/content.css'],
  },

  output: {
    filename: 'js/[name].js',
    path: helpers.root('build'),
  },

  plugins: [
    new plugins.MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
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
};

// combine all configurations and entries.
module.exports = env => {
  return [configScripts, configPopupAndAssets].map(entry => plugins.webpackMerge([configCommon(env), entry]));
};
