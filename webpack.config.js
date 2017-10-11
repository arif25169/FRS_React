const path = require('path');
const webpack = require('webpack');
//path for index.js file creation
const buildPath = path.resolve(__dirname, 'client');
var config = {
  entry: [
    'webpack/hot/dev-server',
     'webpack-hot-middleware/client?http://localhost:3000/',
      path.join(__dirname, '/client/route.jsx')
  ],

    output: {
        path: buildPath,
        filename: 'index.js',
        publicPath: '/'
    },

    // devServer: {
    //     inline: true,
    //     port: 3000
    // },

    plugins: [
              new webpack.HotModuleReplacementPlugin()
    ],

    module: {
      loaders:  [
        {
          test: /\jsx$/,
          exclude:  /node_modules/,
          loader: ['react-hot-loader','babel-loader'],

        },
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
				include: /flexboxgrid/
			}
      ]
    }
}

module.exports = config;
