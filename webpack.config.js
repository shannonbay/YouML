const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './public/javascripts/youml.js',  // Your JavaScript entry point
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundle.js',  // The bundled JavaScript output file
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader',   // Resolves CSS imports and loads the CSS files
        ],
      },
      {
        test: /\.bpmn$/,
        use: 'raw-loader', // Loads BPMN files as raw text
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'node_modules/bpmn-js/dist/assets', to: 'bpmn-js/dist/assets' }, // Copy necessary assets
        { from: 'node_modules/bpmn-js/lib', to: 'bpmn-js/lib' }, // Copy necessary assets
        { from: 'node_modules/jquery', to: 'jquery' }, // Copy necessary assets
      ],
    }),
  ],
  mode: 'development',
  devtool: 'source-map',
};
