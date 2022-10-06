const withPlugins = require('next-compose-plugins');
const pluginsConfig = require('./next.configPlugins')
const rewrites = require('./nextConfigs/rewrites')
const nextImageConfig = require('./nextConfigs/nextImageConfig')
const i18nConfig = require('./nextConfigs/i18nConfig')

const nextConfigs = {
    ...i18nConfig,
    ...nextImageConfig,
    rewrites,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    compiler: {
        styledComponents: true,
    }
}

module.exports = withPlugins(pluginsConfig, nextConfigs);

