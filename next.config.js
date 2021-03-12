const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const {parsed: localEnv} = require('dotenv').config();
const withImages = require('next-images')
const path = require('path')
const withPlugins = require('next-compose-plugins');
const nextEnv = require('next-env');


const urlLoaderConfig = {
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2|scss|css)$/,
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


const sassOptions = {
    includePaths: [path.join(__dirname, 'styles')],
}

const i18nConfig = {
    i18n: {
        locales:process.env.REACT_APP_LOCALS.split(' '),
        defaultLocale:process.env.REACT_APP_DEFAULT_LOCAL,
        localeDetection: false,
    },
    // rewrites() {
    //     return [
    //         {
    //             source: '/post/:title',
    //             destination: '/post',
    //         },
    //
    //     ].filter((x) => x)
    // }
}

const nextImageConfig = {
    images: {
        domains: process.env.REACT_APP_ALLOWED_IMAGES_SOURCES.split(' '),
        deviceSizes: [320,640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
}

module.exports = withPlugins([
    i18nConfig,
    webpackSassLoaderConfig,
    [withCSS(withSass()),urlLoaderConfig],
    nextImageConfig,
    sassOptions,
    withImages, nextEnv({
        staticPrefix: 'REACT_APP_',
        publicPrefix: 'REACT_APP_',
    })
]);

