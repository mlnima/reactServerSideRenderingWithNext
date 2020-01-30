const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const { parsed: localEnv } = require('dotenv').config();
const withPlugins = require('next-compose-plugins');


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


const nextConfiguration  = {
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        return config
    }
};

module.exports = withPlugins([
    [withCSS(withSass()),scssConfig]
], nextConfiguration);
// module.exports = withCSS(withSass({
//     webpack(config, options) {
//         config.module.rules.push({
//             test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//             use: {
//                 loader: 'url-loader',
//                 options: {
//                     limit: 100000
//                 }
//             }
//         });
//
//         return config;
//     }
// }));
//
// module.exports = {
//     env: {
//         customKey: 'my-value',
//     },
// }

