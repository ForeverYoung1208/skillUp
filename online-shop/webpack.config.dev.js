const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/main.bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        port: 5000,
        open: true,
        overlay: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css|sass$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|jfif|png|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]',
                    outputPath: 'images'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html'
        })
    ]
};
