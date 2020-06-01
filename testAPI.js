const axios = require('axios')

const body={
    apiKey:'1MRFK3J-F4F4RQV-G4VQC39-H054A3G',
    username:'Admin',
    postData:{
        "comments" : [],
        "categories" : [
            "test category",
        ],
        "tags" : [
            "test tag",
        ],
        "title" : "this is a post from api call",
        "description" : "description of the post",
        "mainThumbnail" : "https://files.readme.io/5761a8e-Screen_Shot_2016-12-20_at_08.21.17.png",
        "videoTrailerUrl" : "",
        "videoEmbedCode" : "https://www.youtube.com/embed/RP0_8J7uxhs",
        "duration" : "05:07",
        "quality" : "HD",
        "status" : "published",
        "postType" : "video",
        "sourceSite" : "youtube",
    }
}
axios.post('https://findbestporno.com/api/v1/posts/createNewByApi',body).then(res=>{
    console.log( res.data)
}).catch(err=>{
    console.log( err)
})

