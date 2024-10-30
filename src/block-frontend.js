/**
 * All frontend scripts required by our blocks should be included here.
 *
 * This is the file that Webpack is compiling into blocks.frontend.build.js
 */

/**
 * Internal dependencies
 */
 // Nodelist forEach polyfill.
if (window.NodeList && !window.NodeList.prototype.forEach) {
    window.NodeList.prototype.forEach = Array.prototype.forEach;
}

const context = require.context(
   "./block",
   true, 
   /frontend\.js$/ 
);
context.keys().forEach((key) => context(key));
 