/**
 * Webpack Congifuration for WearCast web application
 *
 * This configuration file sets up the build process for the web application, specifying how
 * JavaScript, CSS, and assets for each page should be processed and bundled.
 *
 * Generated using webpack-cli https://github.com/webpack/webpack-cli then further customized
 * to fit the project's specific requirements.
 *
 * @returns {Object} the complete Webpack configuration object
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const e = require('express');

// Check if build is in production mode (set via environment variables)
const isProduction = process.env.NODE_ENV == 'production';

// Determine how styles should be handled based on the build mode
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

// This config is only used for #22, when merged into `main` use the config that is commented out
const config = {
    entry: './src/web/src/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/web/src/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.OPENCAGE_API_KEY': JSON.stringify(process.env.OPENCAGE_API_KEY),
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
};
//

// When merged to main use this config instead:
// Make sure that all paths are correct, I recommend that we use this standard instead of the mixed directory names we have now
/**
 *  `config` Configuration object definition
 *
 * 1. `entry`
 *    - Defines multiple entry points, corresponding to each page of the application
 *    - Each key in `entry` object corresponds to a unique page identifier
 *    - The value is the path to the specific JavaScript file that handles the logic and imports for that page
 * 2. `output`
 *    - Specifies the output directory and filenname pattern for the bundle(s) that Webpack will generate
 *    - `path`: function that ensures that all assets generates to the output directory `dist`
 *    - `filename`: specifies naming convention, each filename matches its entry key
 * 3. `devServer`
 *    - Configuration for the Webpack Development Server, used for local development and testing
 *    - `open`: automatically opens the browser after the server starts
 *    - `host`: configured to 'localhost' to allow access from local machine
 * 4. `plugins`
 *    - Utilizes `HtmlWebpackPlugin` instances for each HTML entry point to generate HTML files that include all Webpack-generated assets
 *    - `template`: specifies the path to the HTML source file that serves as a template
 *    - `filename`: specifies the output filename that will be generated in the output directory `dist`
 *    - `chunks`: array that specifies which bundles should be included in the generated HTML, optimizes loading as
 *                this ensures that only relevant JavaScript and CSS are loaded for each page
 * 5. `module`
 *    - Defines how different types of modules within the project are treated
 *    - `rules`: array that specify how to handle different file types
 *      - JavaScript and JavaScript XML files are transpiled* using Babel to ensure compability with older browsers
 *        * transpile: convert code written in one programming language or version to another similar-level language or version,
 *                     making it compatible with different environments
 *                     https://stackoverflow.com/a/44932758
 *      - CSS files are processed with `css-loader` and `postcss-loader` with CSS either
 *        injected by `style-loader` (takes CSS modules and injects them into the DOM by adding `<style>` tags within the HTML document when the JavaScript runs)
 *        or extracted by `MiniCssExtractPlugin` (extract CSS from JavaScript bundles and outputs it into separate CSS files linked in HTML header) depending on the environment
 *      - Asset files (images, fonts) are handled by specifying the type as 'asset', allowing Webpack to decide whether to
 *        inline or emit it as a separate file
 */
/* const config = {
    entry: {
        home: './src/web/src/home/index.js',
        about: './src/web/src/about/about.js',
        styleCast: './src/web/src/styleCast/styleCast.js',
        chillyCast: './src/web/src/chillyCast/chillyCast.js',
        summerCast: './src/web/src/summerCast/summerCast.js',
        winterCast: './src/web/src/winterCast/winterCast.js'

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', // automatically use keys from the `entry` object
        // Instead of doing it like this:
        // filename: 'home.js',
        // filename: 'about.js',
        // filename: 'styleCast.js',
        // filename: 'chillyCast.js',
        // filename: 'summerCast.js',
        // filename: 'winterCast.js',
    },
    devServer: {
        open: true,
        host: 'localhost'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/web/src/home/index.html',
            filename: 'index.html',
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            template: './src/web/src/about/about.html',
            filename: 'about.html',
            chunks: ['about']
        }),
        new HtmlWebpackPlugin({
            template: './src/web/src/styleCast/styleCast.html',
            filename: 'styleCast.html',
            chunks: ['styleCast']
        }),
        new HtmlWebpackPlugin({
            template: './src/web/src/chillyCast/chillyCast.html',
            filename: 'chillyCast.html',
            chunks: ['chillyCast']
        }),
        new HtmlWebpackPlugin({
            template: './src/web/src/summerCast/summerCast.html',
            filename: 'summerCast.html',
            chunks: ['summerCast']
        }),
        new HtmlWebpackPlugin({
            template: './src/web/src/winterCast/winterCast.html',
            filename: 'winterCast.html',
            chunks: ['winterCast']
        }),
        // Additional plugins can be added here
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
} */

/**
 * Export the configuration as a function to dynamically choose the mode based on the environment (configures and returns the Webpack configuration)
 * 1. Production mode:
 *    - Sets the Webpack mode to `production`, enabling Webpack to perform optimizations
 *    - `MiniCssExtractPlugin` extracts CSS into separate files to optimizze loading speed and caching
 * 2. Development mode:
 *    - Sets the Webpack mode to `development`, for faster build times, detailed error messages and other dev features
 * @returns config object : the complete configuration for Webpack to run
 */
module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.plugins.push(new MiniCssExtractPlugin());
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.OPENCAGE_API_KEY' : JSON.stringify(process.env.OPENCAGE_API_KEY),
            })
        );
    } else {
        config.mode = 'development';
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.OPENCAGE_API_KEY' : JSON.stringify(process.env.OPENCAGE_API_KEY),
            })
        );
    }
    return config;
};
