const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { minify } = require("html-minifier-terser");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const minifyFunction = function () {
    const minifyObject = {
        collapseWhitespace: isProd
    };
    return minifyObject;
}

const optimizationFunction = function () {
    const optimizationConfigObject = {
        splitChunks: {
            chunks: "all"
        }
    };

    if (isProd) {
        optimizationConfigObject.minimize = true;
        optimizationConfigObject.minimizer = [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()];
    }

    return optimizationConfigObject;
};

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        "main": ["./website-pages/main/index.js"],
        "colorsAndType": ["./ui-kit/colors-and-type/colorsAndType.js"],
        "formElements": ["./ui-kit/form-elements/formElements.js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[contenthash].js"
    },
    optimization: optimizationFunction(),
    devServer: {
        port: 8080,
        open: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css"
        }),
        new HTMLWebpackPlugin({
            template: "./website-pages/main/index.pug",
            filename: "index.[contenthash].html",
            chunks: ["main"],
            minify: minifyFunction()
        }),
        new HTMLWebpackPlugin({
            template: "./ui-kit/colors-and-type/colorsAndType.pug",
            filename: "html/colorsAndType.[contenthash].html",
            chunks: ["colorsAndType"],
            minify: minifyFunction()
        }),
        new HTMLWebpackPlugin({
            template: "./ui-kit/form-elements/formElements.pug",
            filename: "html/formElements.[contenthash].html",
            chunks: ["formElements"],
            minify: minifyFunction()
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ico|gif|png|jpg|jpeg|svg)$/,
                loader: "file-loader",
                exclude: [/fonts/],
                options: {
                    name: "./img/[name].[contenthash].[ext]"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                loader: "file-loader",
                exclude: [/img/, /favicon/],
                options: {
                    name: "./fonts/[name].[contenthash].[ext]"
                }
            },
            {
                test: /\.(s[ac]ss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            }
                        }
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "pug-loader",
                        options: {
                            pretty: isDev
                        }
                    }
                ]
            }
        ]
    }
};