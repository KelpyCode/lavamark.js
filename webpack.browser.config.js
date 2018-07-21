const path = require('path');

module.exports = {
  entry: './src/browser.js',
  output: {
    filename: 'main.browser.js',
    path: path.resolve(__dirname, 'dist')
  }
};