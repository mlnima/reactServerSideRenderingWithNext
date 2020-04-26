const settingSchema = require('../../models/settings/settingSchema')
const youtubeDataScrapper = {}
const simpleYoutubeApiLib = require('simple-youtube-api');

youtubeDataScrapper.gettingInfo =async (req, res) => {
    const url = req.body.url
    console.log( req.body)
    let finalData = []
    const findYoutubeApiKey = await settingSchema.findOne({type:'youtubeApiKey'}).exec()
    const youtubeApiKey = findYoutubeApiKey.data.apiKey
    const youtube = new simpleYoutubeApiLib(youtubeApiKey);
    youtube.getVideo(url)
        .then(video => {
            console.log(`The video's title is ${video.title}`);
            res.json({video})
            res.end()

        })
        .catch(err=>{
            console.log( err)
            res.end()
        });
}

module.exports = youtubeDataScrapper