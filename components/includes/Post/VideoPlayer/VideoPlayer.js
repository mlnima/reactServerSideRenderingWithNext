import React from 'react';
import {checkRemovedContent} from "../../../../_variables/ajaxPostsVariables";

const VideoPlayer = props => {
    if (props.postType === 'video') {
        return (
            <div className='video-player'>
                <meta itemProp="name" content={props.title}/>
                <meta itemProp="description" content={props.description}/>
                <meta itemProp="duration" content={props.duration}/>
                <meta itemProp="thumbnailUrl" content={props.mainThumbnail}/>
                <meta itemProp="embedURL" content={props.videoUrl || props.videoEmbedCode}/>
                <meta itemProp="uploadDate" content={props.lastModify}/>
                <div  className="responsive-player">
                    {props.videoUrl?
                        <video className='video-player-video-type' controls controlsList=" nodownload" poster={props.mainThumbnail} preload="none">
                            <source src={props.videoUrl}/>
                        </video>
                        :props.videoEmbedCode && !props.videoUrl?
                            <iframe className={props._id}  title={props.title} src={props.videoEmbedCode} frameBorder="0" width='640' height='360' scrolling="no"/>
                            :!props.videoUrl && !props.videoEmbedCode && props.videoScriptCode?
                                props.videoScriptCode:
                                null
                    }
                </div>

            </div>

        );
    } else return null
};
export default VideoPlayer;