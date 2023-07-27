/** @type {import('next').NextConfig} */
require('module-alias/register')
require('dotenv').config({path: '../../.env'});
const rewrites = require('./nextConfigs/rewrites')
const pluginsConfig = require('./nextConfigs/next.configPlugins')
const withPlugins = require('next-compose-plugins');
const path = require('path')


const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: false,
    rewrites,
    transpilePackages: [
        // 'api-requests',
        // 'custom-server-util',
        // 'custom-util',
        // 'data-structures',
        // 'typescript-types',
        // 'react-hooker-lib',
        // 'ui',
        // 'ui-components',
    ],
    typescript: {
        ignoreBuildErrors: true,
    },
};

//module.exports = nextConfig;
module.exports = withPlugins(pluginsConfig, nextConfig)
// module.exports = nextTranslate( nextConfig)