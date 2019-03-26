const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
        rules: [
            { test: /\.ts|.tsx$/, loader: 'ts-loader' },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            }
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "common",
                    chunks: "all",
                    minChunks: 2,
                    priority: 10,
                    reuseExistingChunk: true
                }
            }
        }
    },

    plugins: [
        new HtmlWebpackPlugin({ template: './index.html', inject: 'body' }),
        new MiniCssExtractPlugin({filename: "assets/[name].[contenthash].css"}),
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