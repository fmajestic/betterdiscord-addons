/**
 * BundleBD config
 *
 * @param {string} plugin Plugin name
 */
module.exports = plugin => ({
  input: `./${plugin}/src/`,
  output: "./dist/"
});
