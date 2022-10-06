module.exports = () =>{
    return {
        beforeFiles: [
            {
                source: `/meta`,
                destination: '/categories',
            },

            {
                source: `/posts`,
                has: [{type: 'query', key: 'content'}],
                destination: '/category/:content'
            },
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
            {
                source: `/categories/:categoryId`,
                destination: '/category/:categoryId',
            },
            {
                source: `/tags/:tagId`,
                destination: '/tag/:tagId',
            },
            {
                source: `/actors/:actorId`,
                destination: '/actor/:actorId',
            },

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
            {
                source: `/post/:title`,
                destination: '/post/:identifier',
                has: [{type: 'query', key: 'identifier'}]
            },
            // {
            //     source: `/posts?content=:id`,
            //     destination: '/categories',
            //     // has: [{type: 'query', key: 'content'}]
            // },


        ]
    }
}


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