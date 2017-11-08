const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        ssr: './src/ssr.tsx'
    },
    resolve: { extensions: ['.js', '.ts', '.tsx'] },
    target: 'node',
    // this makes sure we include node_modules and other 3rd party libraries
    externals: [/(node_modules|main\..*\.js)/],
    output: {
        publicPath: "/",
        path: root('dist'),
        filename: '[name].js',
        libraryTarget: "commonjs2"
    },
    externals: nodeExternals(),
    module: {
        rules: [
            { test: /\.ts|.tsx$/, loader: 'ts-loader', exclude: root('node_modules'), }
        ]
    }
}

function root(args) {
    const _root = path.resolve(__dirname);
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
};