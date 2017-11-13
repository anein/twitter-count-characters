/**
 * Collection of useful methods for Webpack.
 */

var path = require('path');
var fs = require('fs');

/** set the root directory.  */
var ROOT = path.resolve(__dirname, '..');


/**
 * Generates the full file/directory path relative to the root directory.
 *
 */
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [ROOT].concat(args));
}

// exports functions.
exports.root = root;
