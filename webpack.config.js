const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    context: path.resolve('src'),
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*', '!.gitkeep'] }),
        new CopyWebpackPlugin([
            './sw.js',
        ]),
        new HtmlWebpackPlugin({
            template: './template.ejs',
            title: 'PWA boilerplate',
        }),
        new AppManifestWebpackPlugin ({
            logo: './assets/logo.png',
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
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(c|sc|sa)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
    },
};
