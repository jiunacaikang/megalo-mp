const webpack = require("webpack");
const { pagesEntry } = require("@megalo/entry");
const createMegaloTarget = require("@megalo/target");
const compiler = require("@megalo/template-compiler");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const _ = require("./util");
const appMainFile = _.resolve("src/app.js");
const CSS_EXT = {
    wechat: "wxss",
    alipay: "acss",
    swan: "css"
};

const px2rpxLoader = {
    loader: "@megalo/px2rpx-loader",
    options: {
        rpxUnit: 1
    }
};

const postCssLoader = {
    loader: "postcss-loader",
    options: {
        sourceMap: true,
        config: {
            path: "./build/"
        }
    }
};

const cssLoaders = [MiniCssExtractPlugin.loader, "css-loader", px2rpxLoader, postCssLoader];

function createBaseConfig(platform = "wechat", isDev = true) {
    const cssExt = CSS_EXT[platform];
    const devOptimization =
        (!isDev && {
            minimizer: [
                new TerserPlugin(),
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: new RegExp(`\\.${cssExt}$`, "g"),
                    cssProcessorOptions: {
                        safe: true
                    }
                })
            ]
        }) ||
        {};
    return {
        mode: "development",

        target: createMegaloTarget({
            compiler: Object.assign(compiler, {}),
            platform,
            htmlParse: {
                templateName: "octoParse",
                src: _.resolve(`./node_modules/octoparse/lib/platform/${platform}`)
            }
        }),

        entry: {
            app: appMainFile,
            ...pagesEntry(appMainFile)
        },

        output: {
            path: _.resolve(`dist-${platform}/`),
            filename: "static/js/[name].js"
        },

        devServer: {
            // hot: true,
        },

        optimization: {
            ...devOptimization,
            runtimeChunk: {
                name: "runtime"
            },
            splitChunks: {
                maxInitialRequests: 10,
                cacheGroups: {
                    vendor: {//第三方包
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        chunks: "all"
                    },
                    common: {//项目公用配置
                        test: /[\\/]src[\\/](api|utils|store)[\\/].*/,
                        name: "common",
                        minChunks:1,
                        chunks: "all"
                    },
                    components: {
                        test: /[\\/]src[\\/]components[\\/].*/,
                        name: "components",
                        minChunks:3,
                        chunks: "all"
                    }
                }
            }
        },

        devtool: isDev ? "cheap-source-map" : false,

        resolve: {
            extensions: [".vue", ".js", ".json"],
            alias: {
                vue: "megalo",
                "@": _.resolve("src")
            }
        },

        module: {
            rules: [
                {
                    test: /\.pug$/,
                    loader: 'pug-plain-loader'
                },
                
                {
                    test: /\.vue$/,
                    use: [
                        {
                            loader: "vue-loader",
                            options: {}
                        }
                    ]
                },

                {
                    test: /\.js$/,
                    use: "babel-loader"
                },

                {
                    test: /\.css$/,
                    use: cssLoaders
                },

                {
                    test: /\.less$/,
                    use: [...cssLoaders, "less-loader"]
                }
            ]
        },

        plugins: [
            new VueLoaderPlugin(),
            new webpack.ProvidePlugin({
                Megalo: [_.resolve(`./node_modules/@megalo/api/platforms/${platform}`), "default"]
            }),
            new MiniCssExtractPlugin({
                filename: `./static/css/[name].${cssExt}`
            }),
            new CopyWebpackPlugin([
                {
                    from: "src/static/assets",
                    to: "static/assets",
                },
            ]),
        ],
        stats: {
            env: true,
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            entrypoints: false,
            warningsFilter: warning => /Conflicting order between/gm.test(warning),//过滤掉worning提示
        }
    };
}

module.exports = createBaseConfig;
