const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const {parsed: localEnv} = require('dotenv').config();
const withImages = require('next-images')
const path = require('path')
const withPlugins = require('next-compose-plugins');
const nextEnv = require('next-env');


let BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : process.env.PRODUCTION_URL;

// const scssConfig = {
//     webpack(config, options) {
//         config.module.rules.push({
//             test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//             use: {
//                 loader: 'url-loader',
//                 options: {
//                     limit: 100000
//                 }
//             },
//
//         });
//         return config;
//     }
// };


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
        }, {
            sassOptions: {
                includePaths: [path.join(__dirname, 'styles')],
            },
        }, {
            use: {
                loader: 'babel-plugin-styled-components',
                options: {
                    presets: [["styled-components", {"ssr": true}]]
                }
            },

        }, {

            publicRuntimeConfig: {
                base_url: BASE_URL,
            },
            node: {
                fs: "empty"
            },
            images: {
                // deviceSizes: [320, 480, 540, 600, 640, 720, 750, 768, 800, 900, 960, 1024, 1080, 1200, 1280, 1284, 1366, 1440, 1600, 1920, 2048, 2160],
                // domains: ['webdevs.ai'],
                // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            }
        });
        return config;
    }
};


// const nextConfiguration = {
//
//     publicRuntimeConfig: {
//         base_url: BASE_URL,
//     },
//     node: {
//         fs: "empty"
//     },
//     images: {
//         // deviceSizes: [320, 480, 540, 600, 640, 720, 750, 768, 800, 900, 960, 1024, 1080, 1200, 1280, 1284, 1366, 1440, 1600, 1920, 2048, 2160],
//         // domains: ['webdevs.ai'],
//         // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     }
// };


module.exports = withPlugins([[withCSS(withSass()), scssConfig], withImages, nextEnv({
    staticPrefix: 'REACT_APP_',
    publicPrefix: 'REACT_APP_',
})]);

