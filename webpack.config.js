const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
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

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
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
        new ExtractTextPlugin("[name].[contenthash].css"),
        new CopyWebpackPlugin([
            {
                from: 'src/assets/images/',
                to: 'assets/images/'
            },
        ])
    ],

    devServer: {
        historyApiFallback: true,
        stats: {
            assets: true,
            colors: true,
            version: false,
            hash: true,
            timings: true,
            chunks: false,
            chunkModules: false,
            chunkOrigins: false,
            children: false,
            cached: false,
            reasons: false
        },
    },
};

function root(args) {
    const _root = path.resolve(__dirname);
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
};