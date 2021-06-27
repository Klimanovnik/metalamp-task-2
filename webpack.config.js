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
        "index": ["./website-pages/index/index.js"],
        "colors-and-type": ["./ui-kit/colors-and-type/colors-and-type.js"],
        "form-elements": ["./ui-kit/form-elements/form-elements.js"]
    },
    output: {
        path: path.resolve(__dirname, "app"),
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
            filename: "[name].[contenthash].css"
        }),
        new HTMLWebpackPlugin({
            template: "./website-pages/index/index.pug",
            filename: "index.html",
            chunks: ["index"],
            minify: minifyFunction()
        }),
        new HTMLWebpackPlugin({
            template: "./ui-kit/colors-and-type/colors-and-type.pug",
            filename: "html/colors-and-type.html",
            chunks: ["colors-and-type"],
            minify: minifyFunction()
        }),
        new HTMLWebpackPlugin({
            template: "./ui-kit/form-elements/form-elements.pug",
            filename: "html/form-elements.html",
            chunks: ["form-elements"],
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
                test: /\.(s[ac]ss)$/,
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