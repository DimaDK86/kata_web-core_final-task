const path = require('path')
const HTMLWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const { default: test } = require('node:test');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const fileName = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;


// const ghpages = require('gh-pages');

// ghpages.publish('dist', function(err) {});



module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    devtool: !isDev ? 'eval-cheap-module-source-map' : 'source-map',
    plugins: [
        new HTMLWebPackPlugin({
            inject: 'body',
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/images/logo.png'),
                    to: path.resolve(__dirname, 'dist/images')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css'),
        })
    ],
    optimization: {
    minimize: isProd,
    minimizer: [
        new TerserWebpackPlugin({}), // Минимизация JavaScript
        new CssMinimizerPlugin({}), // Минимизация CSS
    ],
},
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                            },
                        },
                    "css-loader",
                ],
            },
            {
                test: /\.less$/,
                use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                            },
                        },
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                            },
                        },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]', // Путь для сохранения шрифтов
                },
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)$/,
                type: 'asset/resource', // Или 'asset/inline', в зависимости от ваших потребностей
                generator: {
                    filename: 'fonts/[name][ext]', // Путь для сохранения шрифтов
                },
            }
        ]
    }
}



















