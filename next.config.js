const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const { parsed: localEnv } = require('dotenv').config();
// const nextEnv = require('next-env');
// const dotenvLoad = require('dotenv-load');
// const withPlugins = require('next-compose-plugins');
const withImages = require('next-images')
// const withNextEnv = nextEnv();

const withPlugins = require('next-compose-plugins');
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');


let BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : process.env.PRODUCTION_URL;

const scssConfig = {
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        });
        return config;
    }
};


const nextConfiguration = {
    publicRuntimeConfig: {
        base_url: BASE_URL,
    },
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
        return config
    },
    node: {
        fs: "empty"
    }
};


module.exports = withPlugins([ [withCSS(withSass()) , scssConfig ], withImages,nextEnv({
    staticPrefix: 'REACT_APP_',
    publicPrefix: 'REACT_APP_',
}) ], nextConfiguration);

