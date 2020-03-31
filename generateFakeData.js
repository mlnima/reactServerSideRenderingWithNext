const axios = require("axios") ;

axios.post('http://localhost:4200/server/posts/admin-postsForTest').then(res => {
    const posts = res.data.posts;
    posts.forEach( async post=>{
        let data={
            title :post.title.en,
            categories : post.categories,
            comments :post.comments,
            actors :post.actors ,
            tags :post.tags ,
            author :'5e322f0f8b2a0637dc3b6a16',
            description : post.description.en,
            disLikes : 0,
            mainThumbnail:post.imageUrl,
            videoTrailerUrl :post.imagePreviewUrl,
            videoEmbedCode:post.iframe,
            likes : 0,
            duration:post.duration,
            quality : post.quality,
            status : 'published',
            postType : "video",
            sourceSite : "???",
            views : 0,
            lastModify:Date.now()
        };

        // let dataToSave = {
        //     title:post.title.en,
        //     author:'5e322f0f8b2a0637dc3b6a16',
        //     categories:post.categories,
        //     actors:post.actors,
        //     tags:post.tags,
        //     mainThumbnail:post.imageUrl,
        //     status:post.status,
        //     type:post.type
        // };
        const body = {
            postData: data,
            // token: localStorage.wt
        };
        axios.post('http://localhost:3000/api/v1/posts/createNewPost', body)
        // await contextData.functions.savePosts(data)
        // console.log(post. )
    })

})