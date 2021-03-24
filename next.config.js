// const withSass = require('@zeit/next-sass');
// const withCSS = require("@zeit/next-css");
const {parsed: localEnv} = require('dotenv').config();
const withImages = require('next-images')
// const path = require('path')
const withPlugins = require('next-compose-plugins');
const nextEnv = require('next-env');




// const sassOptions = {
//     includePaths: [path.join(__dirname, 'styles')],
// }


// const localeSubpaths = {
//     de: 'de',
//     en: 'en',
// };



const i18nConfig = {
    i18n: {
        locales:process.env.REACT_APP_LOCALS.split(' '),
        defaultLocale:process.env.REACT_APP_DEFAULT_LOCAL,
        localeDetection: false,
    },

}

const localeSubPaths = {};

process.env.REACT_APP_LOCALS.split(' ').forEach(locale=>{
    localeSubPaths[locale]=locale
})

const languages = process.env.REACT_APP_LOCALS.replace(' ','|')

const reWriteRoutes = {
    rewrites: async () => {
        return[
            //post routes
            {source:`/admin`,destination: '/admin' },
            {source:`/:locale(${languages})?/video/:title`,destination: '/post' },
            {source:`/:locale(${languages})?/post/:title`,destination: '/post' },
            {source:`/:locale(${languages})?/product/:title`,destination: '/post' },
            {source:`/:locale(${languages})?/article/:title`,destination: '/post' },
            //posts route
            {source:`/:locale(${languages})?/posts`,destination: '/posts' },
            //meta route
            {source:`/:locale(${languages})?/categories`,destination: '/meta' },
            {source:`/:locale(${languages})?/tags`,destination: '/meta' },
            {source:`/:locale(${languages})?/actors`,destination: '/meta' },
            {source:`/categories`,destination: '/meta' },
            {source:`/tags`,destination: '/meta' },
            {source:`/actors`,destination: '/meta' },
            //meta content
            {source:`/:locale(${languages})?/categories/:category`,destination: '/posts' },
            {source:`/:locale(${languages})?/tags/:tag`,destination: '/posts' },
            {source:`/:locale(${languages})?/actors/:actor`,destination: '/posts' },
            {source:`/categories/:category`,destination: '/posts' },
            {source:`/tags/:tag`,destination: '/posts' },
            {source:`/actors/:actor`,destination: '/posts' },
            //auth pages
            //
            {source:`/:locale(${languages})?/page/:pageName`,destination: '/page' },
            {source:`/:locale(${languages})?/profile`,destination: '/profile' },
            {source:`/:locale(${languages})?/checkout`,destination: '/checkout' },
            {source:`/:locale(${languages})?/login`,destination: '/auth/login' },
            {source:`/:locale(${languages})?/register`,destination: '/auth/register' },
        ]
    }
}




const nextImageConfig = {
    images: {
        domains: process.env.REACT_APP_ALLOWED_IMAGES_SOURCES.split(' '),
        deviceSizes: [320,640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
}

module.exports = withPlugins([
    reWriteRoutes,
    i18nConfig,
    nextImageConfig,
    withImages,
    nextEnv({
        staticPrefix: 'REACT_APP_',
        publicPrefix: 'REACT_APP_',
    })
]);

// [withCSS(withSass(withSassConfig)),urlLoaderConfig],
// withCSS(withSass(withSassConfig)),

// const urlLoaderConfig = {
//     webpack(config, options) {
//         config.module.rules.push({
//             test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2|scss|css)$/,
//             use: {
//                 loader: 'url-loader',
//                 options: {
//                     limit: 100000
//                 }
//             },
//
//         });
//         return config;
//     }
// };