const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const { parsed: localEnv } = require('dotenv').config();
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images')

let BASE_URL = process.env.REACT_APP_NODE_ENV !== 'production' ? 'http://localhost:3000' : process.env.REACT_APP_PRODUCTION_URL;

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


module.exports = withPlugins([ [ withSass(), scssConfig ], withImages ], nextConfiguration);

