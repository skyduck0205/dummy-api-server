const {
  override,
  removeModuleScopePlugin,
  addBundleVisualizer,
} = require('customize-cra');

module.exports = override(
  removeModuleScopePlugin(),
  addBundleVisualizer({
    reportFilename: '../report/webpack-bundle-analyzer.html',
  })
);
