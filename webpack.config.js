const path = require('path');

const config = process.env.NODE_ENV === "production" ? {} : require('./config');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    app: path.resolve(__dirname, 'frontend/js/client/index.js')
  },
  module: {
    rules: [    
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },  
  devServer: {
    host: config.webpackSrvHost,
    contentBase: path.join(__dirname, 'public/javascripts'),
    port: config.webpackSrvPort,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    filename: 'app.js'
  }
};