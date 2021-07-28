const webpack = require("webpack");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

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
            chunks: "all",
            cacheGroups: {
                default: false,
                vendors: false,
                styles: {
                    name: "styles",
                    test: /\.s?css$/,
                    minChunks: 1
                }
            }
        }
    };

    if (isProd) {
        optimizationConfigObject.minimize = true;
        optimizationConfigObject.minimizer = [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin({ extractComments: false })];
    }

    return optimizationConfigObject;
};

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        "index": ["./pages/website-pages/index/index.js"],
        "colors-and-type": ["./pages/ui-kit/colors-and-type/colors-and-type.js"],
        "form-elements": ["./pages/ui-kit/form-elements/form-elements.js"],
        "cards": ["./pages/ui-kit/cards/cards.js"]
    },
    output: {
        path: path.resolve(__dirname, "app"),
        filename: isDev ? "js/[name].js" : "js/[name].[contenthash].js"
    },
    optimization: optimizationFunction(),
    devServer: {
        port: 8080,
        open: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: isDev ? "[name].css" : "[name].[contenthash].css",
            ignoreOrder: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new HTMLWebpackPlugin({
            template: "./pages/website-pages/index/index.pug",
            filename: "index.html",
            chunks: ["index"],
            minify: minifyFunction()
        }),
        new HTMLWebpackPlugin({
            template: "./pages/ui-kit/colors-and-type/colors-and-type.pug",
            filename: "pages/colors-and-type.html",
            chunks: ["colors-and-type"],
            minify: minifyFunction()
        }),
        new HTMLWebpackPlugin({
            template: "./pages/ui-kit/form-elements/form-elements.pug",
            filename: "pages/form-elements.html",
            chunks: ["form-elements"],
            minify: minifyFunction()
        }),
        new HTMLWebpackPlugin({
            template: "./pages/ui-kit/cards/cards.pug",
            filename: "pages/cards.html",
            chunks: ["cards"],
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
                    name: "./img/[contenthash].[ext]"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                loader: "file-loader",
                exclude: [/img/, /favicon/],
                options: {
                    name: "./fonts/[name].[ext]"
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "resolve-url-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
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