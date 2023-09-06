const {postTypes} = require("data-structures") ;
const postTypeQueryMatcher = `:postType(${postTypes.join('|')})?`
const languageQueryMatcher = `(${process.env.NEXT_PUBLIC_LOCALS.split(' ').join('|')})`;

module.exports = () => {
    return {
        beforeFiles: [
            {
                source: "/api/:path*",
                destination: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/:path*`,
            },
            {
                source: "/public/:path*",
                destination: `${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/public/:path*`,
            },
            // {
            //     source: `/${languageQueryMatcher}/meta`,
            //     destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCAL}/categories`,
            //     permanent: true,
            // },


        ],
        // afterFiles: [
        //     {source: `/admin`, destination: '/admin', locale: false},
        //
        //
        //
        // ],
        // fallback: [
        //     {
        //         source: `/post/:title`,
        //         destination: '/post/:identifier',
        //         has: [{type: 'query', key: 'identifier'}]
        //     },
        //
        // ]
    }
}

//url examples

//post
// /title title?content=639a0d0d426e74b6d0292486
// /video/title title?id=639a0d0d426e74b6d0292486

//posts
///posts?content=639a0c62426e74b6d0280922
// /fi/posts/video/62118ef9d325ca4bc29b7a63
// /posts?postType=video
// /posts/video

//****language matchers has bug here
// {
//     source: `/${postTypeQueryMatcher}`,
//     destination: '/posts/old/:identifier',
//     has: [{type: 'query', key: 'identifier'}]
// },
//*******
// {
//     source: `/posts/${postTypeQueryMatcher}`,
//     destination: '/posts?postType=:postType',
// },