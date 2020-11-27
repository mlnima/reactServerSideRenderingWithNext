const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const {parsed: localEnv} = require('dotenv').config();
const withImages = require('next-images')
// const withNextEnv = nextEnv();
const path = require('path')
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
            },

        });
        return config;
    }
};

const sassOptions={
    includePaths: [path.join(__dirname, 'styles')]
}

// const styledComponentConfig = {
//     webpack(config, options) {
//         config.module.rules.push({
//             use: {
//                 loader: 'babel-plugin-styled-components',
//                 options: {
//                     presets: [["styled-components", { "ssr": true }]]
//                 }
//             },
//
//         });
//         return config;
//     }
// }


const nextConfiguration = {
    publicRuntimeConfig: {
        base_url: BASE_URL,
    },
    // webpack(config) {
    //     config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    //     return config
    // },
    node: {
        fs: "empty"
    },
    images: {
        // deviceSizes: [320, 480, 540, 600, 640, 720, 750, 768, 800, 900, 960, 1024, 1080, 1200, 1280, 1284, 1366, 1440, 1600, 1920, 2048, 2160],
        // domains: ['webdevs.ai'],
       // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    }
};


module.exports = withPlugins([[withCSS(withSass()), scssConfig], withImages, nextEnv({
// module.exports = withPlugins([ withImages, nextEnv({
    staticPrefix: 'REACT_APP_',
    publicPrefix: 'REACT_APP_',
})], nextConfiguration);

