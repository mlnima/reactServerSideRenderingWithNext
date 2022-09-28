const locales = process.env.NEXT_PUBLIC_LOCALS.split(' ')
const allowedDomainForImages = process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES.split(' ')
const withPlugins = require('next-compose-plugins');
const pluginsConfig = require('./next.configPlugins')

const i18nConfig = locales?.length === 1 ? {} : {
    i18n: {
        locales,
        defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCAL,
        localeDetection: false,
    }
}

const rewrites = () => {
    return {
        beforeFiles: [
            {
                source: `/post`,
                destination: '/posts/old/:id',
                has: [{type: 'query', key: 'id'}]
            },
            {
                source: `/video`,
                destination: '/posts/old/:identifier',
                has: [{type: 'query', key: 'identifier'}]
            },
            {
                source: `/:postType(video|product|article|book|standard|promotion|learn|food|book)?/:title`,
                destination: '/posts/:postType/:identifier',
                has: [{type: 'query', key: 'identifier'}]
            },
            {
                source: `/:metaType(categories|tags|actors)?/:title`,
                destination: '/:metaType/:content',
                has: [{type: 'query', key: 'content'}]
            },
            {source: `/login`, destination: '/auth/login'},
            {source: `/register`, destination: '/auth/register'},
        ],
        afterFiles: [
            {source: `/admin`, destination: '/admin', locale: false},
            // {source: `/:locale(${languages})?/:postType(video|post|product|article|book)/:title`, destination: '/post',has: [{type: 'query', key: 'id'}]},
            {
                source: `/:postType(video|post|product|article|book)?/:title`,
                destination: '/post',
                has: [{type: 'query', key: 'id'}]
            },
        ],
        fallback: [
            {
                source: `/:identifier`,
                destination: '/post/undefinedType/:identifier',
                // has: [{type: 'query', key: 'title'}]
            },
        ]
    }
}


const nextImageConfig = {
    images: {
        deviceSizes: [320, 375, 414, 540, 640, 717, 750, 768, 828, 1024, 1080, 1200, 1920, 2048],
        remotePatterns: allowedDomainForImages.filter(Boolean).reduce((finalPatterns, domain) => {
            const domainSplit = domain.split('.')
            finalPatterns = [
                ...finalPatterns,
                {
                    protocol: 'https',
                    hostname: `**.${domainSplit[domainSplit.length - 2]}.${domainSplit[domainSplit.length - 1]}`
                },
                {
                    protocol: 'https',
                    hostname: `${domainSplit[domainSplit.length - 2]}.${domainSplit[domainSplit.length - 1]}`
                },
            ]
            return finalPatterns
        }, [])
    },
}



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

module.exports = withPlugins(pluginsConfig,nextConfigs);

// {
//     source: `/post/:postType(video|post|product|article|book)`,
//     destination: '/posts?postType=:postType' ,
//     has: [{type: 'query', key: 'postType'}]
// },
// {
//     source: `/post/out/:postType(video|product|article|book|standard|promotion|learn|food|book|out)?/:id`,
//     destination: '/post/:postType/:id',
//     has: [{type: 'query', key: 'id'},{type: 'query', key: 'postType'}]
// },
// {
//     source: `/:title`,
//     destination: '/post/undefinedType/:title',
//     has: [{type: 'query', key: 'title'}]
// },
// {
//     source: `/post/:postType/:id`,
//     destination: '/posts/:postType/:id',
// },
// {
//     source: `/category/:categoryId`,
//     destination: '/categories/:categoryId',
// },
// {
//     source: `/tag/:tagId`,
//     destination: '/tags/:tagId',
// },
// {
//     source: `/actor/:actorId`,
//     destination: '/actors/:actorId',
// },
// {
//     source: `/categories/:categoryId/page/:page`,
//     destination: '/categories/:page',
// },