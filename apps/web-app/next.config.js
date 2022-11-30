require('dotenv').config({path: '../../.env'})
const withPlugins = require('next-compose-plugins');
const pluginsConfig = require('./nextConfigs/next.configPlugins')
const rewrites = require('./nextConfigs/rewrites')
const redirects = require('./nextConfigs/redirects')
const nextImageConfig = require('./nextConfigs/nextImageConfig')

const nextConfigs = {
    ...nextImageConfig,
    // distDir: '../../.next',
    rewrites,
    // experimental:{appDir: true},
    // runtime: 'experimental-edge',
    redirects,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    compiler: {
        styledComponents: true,
    }
}

module.exports = withPlugins(pluginsConfig, nextConfigs);

