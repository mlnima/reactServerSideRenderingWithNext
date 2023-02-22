const {postTypes} = require("data-structures") ;

const postTypeQueryMatcher = `:postType(${postTypes.join('|')})?`



const apiServerProxy = process.env.NEXT_PUBLIC_API_SERVER_URL === process.env.NEXT_PUBLIC_PRODUCTION_URL ?
    [
        {
            source: "/api/:path*",
            destination: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/:path*`,
        },
        {
            source: "/public/:path*",
            destination: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/public/:path*`,
        },
    ] : []


module.exports = () => {
    return {
        beforeFiles: [
            ...apiServerProxy,
            {
                source: "/api/:path*",
                destination: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/:path*`,
            },
            {
                source: "/public/:path*",
                destination: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/public/:path*`,
            },
            {
                source: `/meta`,
                destination: '/categories',
            },
            {source: `/login`, destination: '/auth/login'},
            {source: `/register`, destination: '/auth/register'},
            {source: `/categories/:categoryId`, destination: '/category/:categoryId'},
            {source: `/tags/:tagId`, destination: '/tag/:tagId'},
            {source: `/actors/:actorId`, destination: '/actor/:actorId'},
            {
                source: `/posts`,
                destination: '/category/:content',
                has: [{type: 'query', key: 'content'}]
            },
            {
                source: `/${postTypeQueryMatcher}`,
                destination: '/posts/old/:identifier',
                has: [{type: 'query', key: 'identifier'}]
            },
            {
                source: `/posts/${postTypeQueryMatcher}`,
                destination: '/posts?postType=:postType',
            },
            {
                source: `/posts/${postTypeQueryMatcher}/:id`,
                destination: '/post/old/:id',
            },
            {
                source: `/${postTypeQueryMatcher}/:title`,
                destination: '/post/old/:id',
                has: [{type: 'query', key: 'id'}]
            },
        ],
        afterFiles: [
            {source: `/admin`, destination: '/admin', locale: false},



        ],
        fallback: [
            {
                source: `/post/:title`,
                destination: '/post/:identifier',
                has: [{type: 'query', key: 'identifier'}]
            },

        ]
    }
}

//url examples

//post
// /title title?content=639a0d0d426e74b6d0292486
// /video/title title?id=639a0d0d426e74b6d0292486

//posts

// /fi/posts/video/62118ef9d325ca4bc29b7a63
// /posts?postType=video
// /posts/video