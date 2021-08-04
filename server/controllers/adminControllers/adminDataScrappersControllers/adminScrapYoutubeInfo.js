const settingSchema = require('../../../models/settings/settingSchema');
const simpleYoutubeApiLib = require('simple-youtube-api');

module.exports = async (req, res) => {
    const url = req.body.url

    let finalData = []
    const findYoutubeApiKey = await settingSchema.findOne({type:'youtubeApiKey'}).exec()
    const youtubeApiKey = findYoutubeApiKey.data.apiKey
    const youtube = new simpleYoutubeApiLib(youtubeApiKey);
    if(url.includes('/channel/')){

        youtube.getChannel(url).then(channelData=>{

            // channelData.getVideos().then(i=>{
            // })
            // channelData.getVideos().then(videos=>{
            //     res.json({videos:[...videos]})
            //     res.end()
            // })
        })

    }else if(url.includes('playlist')||url.includes('list')){
        youtube.getPlaylist(url).then(playListData=>{
            playListData.getVideos().then(videos=>{
                res.json({videos:[...videos]})
                res.end()
            })
        })
    }else{
        youtube.getVideo(url)
            .then(video => {
                res.json({videos:[video]})
                res.end()

            })
            .catch(err=>{
                console.log(err)
                res.end()
            });
    }
}