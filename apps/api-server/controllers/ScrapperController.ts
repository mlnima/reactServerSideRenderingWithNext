import {Request, Response} from "express";
import simpleYoutubeApiLib from 'simple-youtube-api';
import settingSchema from "@schemas/settingSchema";
import adminScrapYoutubeInfo from "@util/scrappers/youtube"

class scrapperController{
    static async youtube(req: Request, res: Response){
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
                // })
            })

        }else if(url.includes('playlist')||url.includes('list')){
            youtube.getPlaylist(url).then(playListData=>{
                playListData.getVideos().then(videos=>{
                    res.json({videos:[...videos]})
                })
            })
        }else{
            youtube.getVideo(url)
                .then(video => {
                    res.json({videos:[video]})
                })
                .catch(err=>{

                    res.end()
                });
        }
    }

}

export default scrapperController;