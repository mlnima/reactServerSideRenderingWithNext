const nextTranslate = require('next-translate')
// const withPWA = require('next-pwa')

// const pwaSettings = process.env.NEXT_PUBLIC_PWA ? withPWA({
//     pwa: {
//         dest: 'public',
//         register: true,
//         skipWaiting: true,
//         sw: '/sw.js'
//     }
// }) : {}

// const withMDX = require('@next/mdx')({
//     extension: /\.mdx?$/,
//     options: {
//         remarkPlugins: [],
//         rehypePlugins: [],
//         // If you use `MDXProvider`, uncomment the following line.
//         // providerImportSource: "@mdx-js/react",
//     },
// })


const bundleAnalyzerConfig = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
    openAnalyzer: true,
})

const nextTranslateConfig = nextTranslate({
    webpack: (config, {isServer, webpack}) => {
        return config;
    }
})


// const waConfig = {
//     webpack: (config, {isServer, webpack}) => {
//         config.experiments = {
//             asyncWebAssembly: true,
//             layers: true,
//         };
//         return config;
//     }
// }

// const withMDXConfig = withMDX({
//     pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
// })




const pluginsConfig = [
    bundleAnalyzerConfig,
    // waConfig,
    nextTranslateConfig
]





module.exports = pluginsConfig