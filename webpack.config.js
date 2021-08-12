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

const entryFunction = function (pageAndTypeObj) {

    for (page in pageAndTypeObj) {
        pageAndTypeObj[page] = [`./pages/${pageAndTypeObj[page]}/${page}/${page}.js`];
    }

    return pageAndTypeObj;

};

const htmlRender = function (page, pageType) {

    return new HTMLWebpackPlugin({
        template: `./pages/${pageType}/${page}/${page}.pug`,
        filename: (page === "index") ? `${page}.html` : `pages/${page}.html`,
        chunks: [`${page}`],
        minify: minifyFunction()
    });

};

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: entryFunction({
        "index": "website-pages",
        "colors-and-type": "ui-kit",
        "form-elements": "ui-kit",
        "cards": "ui-kit",
        "headers-and-footers": "ui-kit",
        "landing-page": "website-pages",
        "search-room": "website-pages",
        "room-details": "website-pages",
        "registration-page": "website-pages",
        "sign-in-page": "website-pages"
    }),
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
        htmlRender("index", "website-pages"),
        htmlRender("colors-and-type", "ui-kit"),
        htmlRender("form-elements", "ui-kit"),
        htmlRender("cards", "ui-kit"),
        htmlRender("headers-and-footers", "ui-kit"),
        htmlRender("landing-page", "website-pages"),
        htmlRender("search-room", "website-pages"),
        htmlRender("room-details", "website-pages"),
        htmlRender("registration-page", "website-pages"),
        htmlRender("sign-in-page", "website-pages")
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