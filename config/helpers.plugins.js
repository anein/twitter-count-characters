/**
 * Collection of the most common used plugins for Webpack:
 *
 * - awesome-typescript-loader
 * - copy-webpack-plugin
 * - html-webpack-plugin
 * - assets-webpack-plugin
 * - html-elements-plugin
 * - webpack-merge
 * - webpack-md5-hash
 * - compression-webpack-plugin
 * - ContextReplacementPlugin [inbuilt]
 * - DefinePlugin [inbuilt]
 * - NamedModulesPlugin [inbuilt]
 * - ngAnnotatePlugin
 */

/**
 * Plugin: CopyWebpackPlugin
 *
 * @description Copies individual files or entire directories to the build directory.
 *
 * {@link https://github.com/kevlened/copy-webpack-plugin#copy-webpack-plugin}
 *
 */
exports.CopyWebpackPlugin = require('copy-webpack-plugin');

//
// /**
//  * Plugin: ContextReplacementPlugin
//  *
//  * @description The plugin replaces the default resource.
//  *
//  * {@link https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin}
//  *
//  * @type {ContextReplacementPlugin}
//  */
// exports.ContextReplacementPlugin = require( 'webpack/lib/ContextReplacementPlugin' );
//
// /**
//  * Plugin: DefinePlugin
//  *
//  * @description The DefinePlugin allows you to create global constants which can be configured at compile time.
//  *
//  * {@link https://webpack.github.io/docs/list-of-plugins.html#defineplugin}
//  *
//  */
// exports.DefinePlugin = require( 'webpack/lib/DefinePlugin' );
//
/**
 * Plugin: HtmlWebpackPlugin
 *
 */
exports.HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Plugin: CopyWebpackPlugin
 *
 * @description Copies individual files or entire directories to the build directory.
 *
 * {@link https://github.com/kevlened/copy-webpack-plugin#copy-webpack-plugin}
 *
 */
exports.CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Plugin: webpackMerge
 *
 * @description Provides a merge function that concatenates arrays and merges objects
 *
 * {@link https://github.com/survivejs/webpack-merge}
 */
exports.webpackMerge = require('webpack-merge');

/**
 * Plugin: ExternalsPlugin
 *
 * @description considers all modules under the local node_modules/ directory as externals.
 *
 */
exports.ExternalsPlugin = require('webpack-externals-plugin');

/**
 * Plugin: ExtractTextPlugin
 *
 * @description Extract text from bundle into a file.
 */
exports.ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Plugin: WebpackMD5Hash
 *
 * @description Plugin to replace a standard webpack chunkhash with md5
 *
 * {@link https://github.com/erm0l0v/webpack-md5-hash}
 */
exports.WebpackMD5Hash = require('webpack-md5-hash');


