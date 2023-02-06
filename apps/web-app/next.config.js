require('dotenv').config({path: '../../.env'})
const withPlugins = require('next-compose-plugins');
const pluginsConfig = require('./nextConfigs/next.configPlugins')
const rewrites = require('./nextConfigs/rewrites')
const redirects = require('./nextConfigs/redirects')
const nextImageConfig = require('./nextConfigs/nextImageConfig')


// const MY_PREFIX = /^REACT_APP_/i;
//
// const transformedEnv = Object.entries(process.env)
//     .filter(([key, value]) => MY_PREFIX.test(key))
//     .reduce((finalEnvs, current) => {
//         const envKey = current[0].replace('REACT_APP_', 'NEXT_PUBLIC_')
//         finalEnvs[envKey] = current[1]
//         return finalEnvs
//     }, {})
//
//
// import * as entry from


const nextConfigs = {
    ...nextImageConfig,
    // distDir: '../../.next',
    rewrites,
    reactStrictMode: false,
    experimental: {appDir: true},
    // runtime: 'experimental-edge',
    redirects,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true
    },
    compiler: {
        styledComponents: true
    }
    // env: transformedEnv
}

module.exports = withPlugins(pluginsConfig, nextConfigs);
// module.exports = nextConfigs;

