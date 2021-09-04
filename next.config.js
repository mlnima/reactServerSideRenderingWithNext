
const {parsed: localEnv} = require('dotenv').config();
const { i18n } = require('./next-i18next.config');
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins');
const nextEnv = require('next-env');
const languages = process.env.REACT_APP_LOCALS.replace(' ', '|')
const locales = process.env.REACT_APP_LOCALS.split(' ')
const withPWA = require('next-pwa')
require('webpack')
// const settingSchema = require("./server/models/settings/settingSchema");


//
// const identity = settingSchema.findOne({type: 'identity'}).exec()
// const design = settingSchema.findOne({type: 'design'}).exec()


const svgLoader= {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    }
}

const i18nConfig = locales.length === 1 ? {} : {
    i18n: {
        locales,
        defaultLocale: process.env.REACT_APP_DEFAULT_LOCAL,
        localeDetection: false,
    }
}
const additionalConfig = {
    onDemandEntries: {
        maxInactiveAge: 1000 * 60 * 60 * 24,
        pagesBufferLength: 200,
    },
    // api: {
    //     bodyParser: false,
    // },
    poweredByHeader: false,
    reactStrictMode: true,

}

// const environmentVariables = ()=> {
//
//
//     try {
//         // const identity = await settingSchema.findOne({type: 'identity'}).exec()
//         // const design = await settingSchema.findOne({type: 'design'}).exec()
//         //console.log('identity : ',identity)
//         return {
//             env: {
//                 // REACT_APP_SETTING_IDENTITY : JSON.stringify(identity.data),
//                 // REACT_APP_SETTING_DESIGN:  JSON.stringify(design.data),
//                 // REACT_APP_SETTING_TEST:'test'
//             }
//         }
//     }catch (err){
//         console.log(err)
//     }
// }
const reWriteRoutes = {
    rewrites: async () => {
        return [
            {source: `/admin`, destination: '/admin', locale: false},

            {source: `/:locale(${languages})?/:postType(video|post|product|article|book)/:title`, destination: '/post'},
            {source: `/:postType(video|post|product|article|book)?/:title`, destination: '/post'},

            {source: `/:locale(${languages})?/login`, destination: '/auth/login'},
            {source: `/login`, destination: '/auth/login'},

            {source: `/:locale(${languages})?/register`, destination: '/auth/register'},
            {source: `/register`, destination: '/auth/register'},
        ]
    }
}
const nextImageConfig = {
    images: {
        domains: process.env.REACT_APP_ALLOWED_IMAGES_SOURCES.split(' '),
        deviceSizes: [320,375,414,540, 640,717, 750,768, 828,1024, 1080, 1200, 1920, 2048, 3840],
    },
}
const pwaSettings = {
    pwa:{
        dest:'public',
        register:true,
        skipWaiting:true,
        sw: '/sw.js'
    }
}

module.exports = withPlugins([
    // environmentVariables,
    additionalConfig,
    i18n,
    svgLoader,
    process.env.NODE_ENV === 'production' ? withPWA(pwaSettings) :{},
    reWriteRoutes,
    nextImageConfig,
    withImages,
    nextEnv({
        staticPrefix: 'REACT_APP_',
        publicPrefix: 'REACT_APP_',
    }),
    i18nConfig,
]);


