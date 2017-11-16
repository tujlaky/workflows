'use strict';
const fs = require('fs');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const webpackMerge = require('webpack-merge');

const helpers = require('./helpers');
const webpackMergeDll = webpackMerge.strategy({ plugins: 'replace' });
const commonConfig = require('./webpack.common.js');

const ENV = (process.env.ENV = process.env.NODE_ENV = 'development');
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8081;
const HMR = helpers.hasProcessFlag('hot');

const METADATA = webpackMerge(commonConfig({ env: ENV }).metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: HMR
});

const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;

module.exports = function() {
    var _config = webpackMerge(commonConfig({ env: ENV }), {
        devtool: 'cheap-module-source-map',

        module: {
            rules: [{
                    test: /\.ts$/,
                    use: [{
                        loader: 'tslint-loader',
                        options: {
                            configFile: 'tslint.json'
                        }
                    }],
                    exclude: [/\.(spec|e2e)\.ts$/, helpers.root('node_modules')]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader?sourceMap'],
                    include: [helpers.projectRoot('src', 'app', 'styles')]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader?sourceMap',
                        'resolve-url-loader',
                        'sass-loader?sourceMap'
                    ],
                    include: [helpers.projectRoot('src', 'app', 'styles')]
                }
            ]
        },

        plugins: [
            new DefinePlugin({
                ENV: JSON.stringify(METADATA.ENV),
                HMR: METADATA.HMR,
                'process.env': {
                    ENV: JSON.stringify(METADATA.ENV),
                    NODE_ENV: JSON.stringify(METADATA.ENV),
                    HMR: METADATA.HMR
                }
            }),

            // new DllBundlesPlugin({
            //     bundles: {
            //         polyfills: [
            //             'core-js',
            //             {
            //                 name: 'zone.js',
            //                 path: 'zone.js/dist/zone.js'
            //             },
            //             {
            //                 name: 'zone.js',
            //                 path: 'zone.js/dist/long-stack-trace-zone.js'
            //             }
            //         ],
            //         vendor: [
            //             '@angular/platform-browser',
            //             '@angular/platform-browser-dynamic',
            //             '@angular/core',
            //             '@angular/common',
            //             '@angular/forms',
            //             '@angular/http',
            //             '@angular/router',
            //             '@angularclass/hmr',
            //             'rxjs'
            //         ]
            //     },
            //     dllDir: helpers.root('dll'),
            //     webpackConfig: webpackMergeDll(commonConfig({ env: ENV }), {
            //         devtool: 'cheap-module-source-map',
            //         plugins: []
            //     })
            // }),

            // /**
            //  * Plugin: AddAssetHtmlPlugin
            //  * Description: Adds the given JS or CSS file to the files
            //  * Webpack knows about, and put it into the list of assets
            //  * html-webpack-plugin injects into the generated html.
            //  *
            //  * See: https://github.com/SimenB/add-asset-html-webpack-plugin
            //  */
            // new AddAssetHtmlPlugin([
            //     { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
            //     { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
            // ]),

            new LoaderOptionsPlugin({
                debug: true,
                options: {}
            })
        ],

        devServer: {
            port: METADATA.port,
            host: METADATA.host,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            }
        }
    });

    if (fs.existsSync(helpers.devHookFile())) {
        require(helpers.devHookFile())(_config);
    }

    return _config;
};