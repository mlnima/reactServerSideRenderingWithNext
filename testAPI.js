const axios = require('axios')

const body={
    apiKey:'N420S9H-8Y44B84-GSHBSE2-D4HEN8P',
    username:'Admin',
    duplicateContent:false,
    downloadImageContent:false,
    postData:{
        "title" : "this post is created by API call",
        "tags":[{type:'tags',name:'tag test from API Call'}],
        "categories":[{type:'categories',name:' category test from API Call'}],
        "description" : "description of the post",
        "mainThumbnail" : "https://www.ahaussmann.com/wp-content/uploads/2016/05/test.jpg",
        "videoTrailerUrl" : "http://techslides.com/demos/sample-videos/small.mp4",
        "videoEmbedCode" : "https://www.youtube.com/embed/RP0_8J7uxhs",
        "duration" : "60:07",
        "quality" : "2160p",
        "status" : "published",
        "postType" : "video",
        "sourceSite" : "youtube",
    }
}

axios.post('https://www.mydomain.com/api/v1/posts/createNewByApi',body).then(res=>{
    console.log( res.data)
}).catch(err=>{
    console.log( err.response.data.error)
})

