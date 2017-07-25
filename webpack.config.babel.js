import webpack from 'webpack';
import path from 'path';
const distDir = path.join(__dirname, 'public/dist');

const config = {
  entry: './client/src/app',
  output: {
    path: distDir,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: ['node_modules'],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015', 'stage-2']
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map'
  // plugins: [new webpack.HotModuleReplacementPlugin()],
  // devServer: {
  //   contentBase: distDir,
  //   filename: 'bundle.js',
  //   compress: true,
  //   port: 3000,
  //   historyApiFallback: true,
  //   hot: true
  // }
};

export default config;
