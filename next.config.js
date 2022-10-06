const withPlugins = require('next-compose-plugins');
const pluginsConfig = require('./next.configPlugins')
const rewrites = require('./nextConfigs/rewrites')
// const redirects = require('./nextConfigs/redirects')
const nextImageConfig = require('./nextConfigs/nextImageConfig')
const i18nConfig = require('./nextConfigs/i18nConfig')

const nextConfigs = {
    ...i18nConfig,
    ...nextImageConfig,
    rewrites,
    // redirects,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    compiler: {
        styledComponents: true,
    }
}

module.exports = withPlugins(pluginsConfig, nextConfigs);

