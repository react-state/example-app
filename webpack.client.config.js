const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    devtool: 'eval',
    entry: {
        'app': root('src/index.tsx'),
        'vendors': root('/src/vendors.ts')
    },
    output: {
        filename: "assets/[name].[hash].bundle.js",
        chunkFilename: "assets/[id].[hash].bundle.js",
        publicPath: '/',
        path: root('dist'),
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        loaders: [
            { test: /\.ts|.tsx$/, loader: 'ts-loader' },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendors'] }),
        new HtmlWebpackPlugin({ template: './index.html', inject: 'body' }),
        new ExtractTextPlugin("assets/[name].[contenthash].css"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/assets/images/',
                to: 'assets/images/'
            },
        ])
    ],

};

function root(args) {
    const _root = path.resolve(__dirname);
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
};