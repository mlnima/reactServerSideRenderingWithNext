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
        plugins: [
        ]
    },
};