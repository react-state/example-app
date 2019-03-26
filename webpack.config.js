const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
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
                    chunks: "initial",
                    minChunks: 2,
                    priority: 10,
                    reuseExistingChunk: true
                }
            }
        }
    },

    plugins: [
        new HtmlWebpackPlugin({ template: './index.html', inject: 'body' }),
        new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}),
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