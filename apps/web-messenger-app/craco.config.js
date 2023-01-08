const CracoAlias = require("craco-alias");
const Dotenv = require('dotenv-webpack')
const DefinePlugin = require('webpack')
const dotenv = require('dotenv')
const envVariablesFromFile = dotenv.config({path: '../../.env'}).parsed
const prefix = /^NEXT_PUBLIC_/i
const allowedEnvVariables = Object.entries(envVariablesFromFile)
    .filter(([key, value]) => prefix.test(key)).reduce((finalEnvs,current)=>{
        const envKey  = current[0].replace('NEXT_PUBLIC','REACT_APP')
        finalEnvs[envKey] = current[1]
        return finalEnvs
    },{})


// const envVariables = Object.fromEntries(allowedEnvVariables)


console.log('process.env.NEXT_PUBLIC_SOCKET_SERVER_URL', allowedEnvVariables)


module.exports = {

    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                baseUrl: "./src",
                tsConfigPath: "./tsconfig.paths.json"
            }
        }
    ],
    webpack: {
        // alias: {
        //     environment: JSON.stringify(allowedEnvVariables)
        // }
        plugins: [
        //     // new Dotenv(),
        //     // new DefinePlugin({
        //     //     'process.env': JSON.stringify(allowedEnvVariables)
        //     // })
        //     new DefinePlugin({
        //         'process.env.NEXT_PUBLIC_PRODUCTION_URL': JSON.stringify(allowedEnvVariables.NEXT_PUBLIC_PRODUCTION_URL)
        //         'process.env.BROWSER':JSON.stringify('none')
        //     })
        //     new DefinePlugin({
        //         'process.env':{
        //             'REACT_APP_PRODUCTION_URL': JSON.stringify('REACT_APP_PRODUCTION_URL'),
        //             'API_URL': JSON.stringify('http://localhost:8080/bands')
        //         }
        //     })
        ]
    },
    // babel: {
    //     loaderOptions: (babelLoaderOptions, { env, paths }) => {
    //        console.log('loaderOptions',paths)
    //         return babelLoaderOptions;
    //     },
    // },
};