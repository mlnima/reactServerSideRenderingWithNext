const path = require('path');
const dotenv = require('dotenv');
const CracoAlias = require("craco-alias");
const { getLoader, loaderByName } = require("@craco/craco");

// Load environment variables from ../../.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const packages = [];
console.log(__dirname);
packages.push(path.join(__dirname, "../../packages/utils"));

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                baseUrl: "./src",
                tsConfigPath: "./tsconfig.paths.json",
            },
        },
    ],
    webpack: {
        configure: (webpackConfig, arg) => {
            const { isFound, match } = getLoader(
              webpackConfig,
              loaderByName("babel-loader")
            );
            if (isFound) {
                const include = Array.isArray(match.loader.include)
                  ? match.loader.include
                  : [match.loader.include];

                match.loader.include = include.concat(packages);
            }
            return webpackConfig;
        },
        plugins: [],
    },
};

// const path = require('path');
// const CracoAlias = require("craco-alias");
// const { getLoader, loaderByName } = require("@craco/craco");
// const packages = [];
// console.log(__dirname);
// packages.push(path.join(__dirname, "../../packages/utils"));
//
// module.exports = {
//
//     plugins: [
//         {
//             plugin: CracoAlias,
//             options: {
//                 source: "tsconfig",
//                 baseUrl: "./src",
//                 tsConfigPath: "./tsconfig.paths.json"
//             }
//         },
//
//     ],
//     webpack: {
//         configure: (webpackConfig, arg) => {
//             const { isFound, match } = getLoader(
//               webpackConfig,
//               loaderByName("babel-loader")
//             );
//             if (isFound) {
//                 const include = Array.isArray(match.loader.include)
//                   ? match.loader.include
//                   : [match.loader.include];
//
//                 match.loader.include = include.concat(packages);
//             }
//             return webpackConfig;
//         },
//         plugins: [
//         ]
//     },
// };

















// {
//     plugin: require('craco-babel-loader'),
//     options: {
//         includes: [resolveApp('../../packages/utils')],
//     },
// },
// const CracoAlias = require("craco-alias");
//
//
// module.exports = {
//
//     plugins: [
//         {
//             plugin: CracoAlias,
//             options: {
//                 source: "tsconfig",
//                 baseUrl: "./src",
//                 tsConfigPath: "./tsconfig.paths.json"
//             }
//         }
//     ],
//     webpack: {
//         plugins: [
//         ]
//     },
// };