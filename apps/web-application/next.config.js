/** @type {import('next').NextConfig} */
require('module-alias/register')
require('dotenv').config({path: '../../.env'});
// const rewrites = require('./nextConfigs/rewrites')
// const nextTranslate = require('next-translate-plugin')
// const pluginsConfig = require('./nextConfigs/next.configPlugins')
// const withPlugins = require('next-compose-plugins');
const i18n = require("./i18n");


const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
    // forceLocale: false,
    // trailingSlash: true,
    // rewrites:async ()=>{
    //     return[
    //         {
    //             source: '/with-locale', // automatically handles all locales
    //             destination: '/', // automatically passes the locale on
    //             // source: '/',
    //             // destination: `/${i18n.defaultLocale}`,
    //         },
    //     ]
    // },
    // redirects: async () => {
    //     return [
    //         {
    //             source: '/',
    //             destination: `/${i18n.defaultLocale}`,
    //             permanent: true,
    //         }
    //     ]
    // },
    reactStrictMode: false,
    compiler: {
        styledComponents: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    // i18n:{ defaultLocale: i18n.defaultLocale}
}

module.exports = nextConfig
//
// module.exports = withPlugins([
//     nextTranslate
// ], nextConfig)

//@ts-ignore
// module.exports = nextTranslate(nextConfig) ;