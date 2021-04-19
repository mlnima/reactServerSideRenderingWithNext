
//import {checkRemovedContent} from "../../../../_variables/ajaxPostsVariables";

const VideoPlayer = ({title,description,duration,mainThumbnail,videoEmbedCode,lastModify,videoUrl,_id,videoScriptCode}) => {
        return (
            <div className='video-player'>
                <meta itemProp="name" content={title}/>
                <meta itemProp="description" content={description}/>
                <meta itemProp="duration" content={duration}/>
                <meta itemProp="thumbnailUrl" content={mainThumbnail}/>
                <meta itemProp="embedURL" content={videoUrl || videoEmbedCode}/>
                <meta itemProp="uploadDate" content={lastModify}/>
                <div  className="responsive-player">
                    {videoUrl?
                        <video className='video-player-video-type' controls controlsList=" nodownload" poster={mainThumbnail} preload="none">
                            <source src={videoUrl}/>
                        </video>
                        :videoEmbedCode && !videoUrl?
                            <iframe className={_id}  title={title} src={videoEmbedCode} frameBorder="0" width='640' height='360' scrolling="no"/>
                            :!videoUrl && !videoEmbedCode && videoScriptCode?
                                videoScriptCode:
                                null
                    }
                </div>

            </div>

        );
};
export default VideoPlayer;