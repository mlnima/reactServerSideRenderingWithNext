// require('dotenv').config({path: '../../.env'})
const withPlugins = require('next-compose-plugins');
const pluginsConfig = require('./nextConfigs/next.configPlugins')
const rewrites = require('./nextConfigs/rewrites')
const redirects = require('./nextConfigs/redirects')
const nextImageConfig = require('./nextConfigs/nextImageConfig')

// const MY_PREFIX = /^REACT_APP_/i;

// const transformedEnv = Object.keys(process.env)
//     .filter(key => MY_PREFIX.test(key))
//     .reduce((env, key) => {
//         const craKey = key.replace(MY_PREFIX, "NEXT_PUBLIC_");
//         env[craKey] = process.env[key];
//         return env;
//     }, {});





const nextConfigs = {
    ...nextImageConfig,
    // distDir: '../../.next',
    rewrites,
    reactStrictMode: false,
    experimental:{appDir: true},
    // runtime: 'experimental-edge',
    redirects,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true
    },
    compiler: {
        styledComponents: true
    },
    // env: transformedEnv
}

module.exports = withPlugins(pluginsConfig, nextConfigs);
// module.exports = nextConfigs;

