const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const {parsed: localEnv} = require('dotenv').config();
const withImages = require('next-images')
const path = require('path')
const withPlugins = require('next-compose-plugins');
const nextEnv = require('next-env');



let BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : process.env.PRODUCTION_URL;

const scssConfig = {
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|scss|css)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            },

        });
        return config;
    }
};


const webpackSassLoaderConfig = {
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                    // load as string for importing file to styled component
                    "to-string-loader",
                ],
            },
        ],
    },
};


const   sassOptions= {
    includePaths: [path.join(__dirname, 'styles')],
}

// module.exports = withPlugins([[withCSS(withSass()), scssConfig], withImages, nextEnv({
//     staticPrefix: 'REACT_APP_',
//     publicPrefix: 'REACT_APP_',
// })]);

module.exports = withPlugins([
    // scssConfig,
    webpackSassLoaderConfig,
    withCSS(withSass()),
    sassOptions,
    withImages, nextEnv({
        staticPrefix: 'REACT_APP_',
        publicPrefix: 'REACT_APP_',
    })
]);

