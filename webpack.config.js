const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path= require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require('autoprefixer');
const findFilesInDir = require('./findAll');


let conf = {
    entry:{
        main: path.resolve(__dirname,'./src/app/index.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname,'./dist'),
    },
    resolve: {
        extensions: ['.js']
    },
    module:{
        rules:[
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: ['ie >= 8', 'last 2 version']
                                })
                            ],
                        }
                    },
                    {
                        loader: 'less-loader',
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: ['ie >= 8', 'last 2 version']
                                })
                            ],
                        }
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            },
            {
                test: /\.(gif|jpg?g|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'img/'
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: false,
            chunks:{
                head:'style.css',
                js: 'main.js',
            }
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
                //,sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3080,
        overlay:true
    },
    ///watch:true
};


let templateFilesConf = findFilesInDir('src/app', '.html')
    .map((templateFileName) =>
        new HtmlWebpackPlugin({
            filename: 'layouts/'+ templateFileName.split('/').pop(),
            template: templateFileName,
            inject: false,
                chunks:{}
        })
    );


conf.plugins = conf.plugins.concat(templateFilesConf);



module.exports = (env,options)=>{
    let production = options.mode === 'production';
    conf.devtool = production
        ? false
        : 'source-map';
   return conf;
};


