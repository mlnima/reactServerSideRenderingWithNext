/** @type {import('next').NextConfig} */
require('module-alias/register')
require('dotenv').config({path: '../../.env'});
const rewrites = require('./nextConfigs/rewrites')
// const nextTranslate = require('next-translate-plugin')
// const pluginsConfig = require('./nextConfigs/next.configPlugins')
// const withPlugins = require('next-compose-plugins');
// const i18n = require("./i18n");
const {postTypes} = require("data-structures");
const postTypeQueryMatcher = `:postType(${postTypes.join('|')})?`
const languageQueryMatcher = `(${process.env.NEXT_PUBLIC_LOCALES.split(' ').join('|')})`;


const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    // defaultLocale: i18n.defaultLocale,
    experimental: {
        serverActions: true,
    },
    rewrites,
    async redirects() {
        return [
            {
                source: `/${languageQueryMatcher}/meta`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/categories`,
                permanent: true,
            },
            {
                source: `/meta`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/categories`,
                permanent: true,
            },
            {
                source: `/${languageQueryMatcher}/categories/:categoryId`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/category/:categoryId`,
                permanent: true
            },
            {
                source: `/categories/:categoryId`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/category/:categoryId`,
                permanent: true
            },
            {
                source: `/${languageQueryMatcher}/tags/:tagId`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/tag/:tagId`,
                permanent: true
            },
            {
                source: `/tags/:tagId`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/tag/:tagId`,
                permanent: true
            },
            {
                source: `/${languageQueryMatcher}/actors/:actorId`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/actor/:actorId`,
                permanent: true
            },
            {
                source: `/actors/:actorId`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/actor/:actorId`,
                permanent: true
            },
            {
                source: `/${languageQueryMatcher}/posts`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/category/:content`,
                has: [{type: 'query', key: 'content'}],
                permanent: true
            },
            {
                source: `/posts`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/category/:content`,
                has: [{type: 'query', key: 'content'}],
                permanent: true
            },
            {
                source: `/${languageQueryMatcher}/posts/${postTypeQueryMatcher}/:id`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/post/video/:id`,
                permanent: true
            },
            {
                source: `/posts/${postTypeQueryMatcher}/:id`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/post/video/:id`,
                permanent: true
            },
            {
                source: `/${languageQueryMatcher}/${postTypeQueryMatcher}/:title`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/post/video/:id`,
                has: [{type: 'query', key: 'id'}],
                permanent: true
            },
            {
                source: `/${postTypeQueryMatcher}/:title`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/post/video/:id`,
                has: [{type: 'query', key: 'id'}],
                permanent: true
            },
        ]
    },
    // forceLocale: false,
    // trailingSlash: true,
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