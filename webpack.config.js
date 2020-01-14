const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    context: path.resolve('src'),
    entry: { bundle: './app' },
    plugins: [
        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*', '!.gitkeep'] }),
        new CopyWebpackPlugin([
            'sw.js',
        ]),
        new HtmlWebpackPlugin({ template: 'template.html' }),
        new AppManifestWebpackPlugin ({
            logo: './assets/images/logo.png',
            output: 'assets/',
            prefix: '/assets',
            persistentCache: false,
            config: {
                appName: 'PWA boilerplate',
                appDescription: '',
                background: '#00000000',
                theme_color: '#fff',
                start_url: '/',
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader', 'import-glob-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.wasm', '.mjs', '.jsx', '.js', '.json'],
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
    },
};
