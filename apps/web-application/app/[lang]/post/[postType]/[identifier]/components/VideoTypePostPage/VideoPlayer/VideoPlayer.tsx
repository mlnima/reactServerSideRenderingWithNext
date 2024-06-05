import React, {FC} from "react";
import {convertDurationStringToIso8601} from "shared-util";
import {convertDateToIsoString} from "shared-util";
import {Post} from "typescript-types";
import './VideoPlayer.styles.scss';

interface PropTypes {
    post:Post,
    locale:string,
    dictionary: {
        [key: string]: string
    }
}

const VideoPlayer: FC<PropTypes> = ({post}) => {

    const uploadDate = convertDateToIsoString(post.updatedAt || post.createdAt)
    const mainThumbnail = post.mainThumbnail?.includes('http') ?
        post.mainThumbnail :
        `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${post.mainThumbnail}`

    return (
        <div className='video-player'>
            {!!post.title && <meta itemProp="name" content={post.title}/>}
            {!!post.description &&
                <meta itemProp="description" content={typeof post.description === 'string' ? post.description : ''}/>}
            {!!post.duration && <meta itemProp="duration" content={convertDurationStringToIso8601(post.duration)}/>}
            {!!mainThumbnail &&
                <meta itemProp="thumbnailUrl" content={mainThumbnail}/>}
            {!!post.videoUrl && <meta itemProp="contentUrl" content={post.videoUrl}/>}
            {!!post.videoEmbedCode && <meta itemProp="embedURL" content={post.videoEmbedCode}/>}
            {!!uploadDate && <meta itemProp="uploadDate" content={uploadDate}/>}
            {!!post.actors?.length && post.actors?.map(actor => {
                return (
                    <meta key={actor._id} itemProp="actor" content={actor.name}/>
                )
            })}
            <div className="responsive-player">
                {post.videoUrl ?
                    <video className='video-player-video-type' controls controlsList=" nodownload"
                           poster={post.mainThumbnail} preload="none">
                        <source src={post.videoUrl}/>
                    </video>
                    : post.videoEmbedCode && !post.videoUrl ?
                        <iframe className={post._id} loading="lazy" allow="fullscreen" title={post.title} src={post.videoEmbedCode}
                                frameBorder="0" width='640' height='360'/>
                        : !post.videoUrl && !post.videoEmbedCode && post.videoScriptCode ?
                            post.videoScriptCode :
                            null
                }
            </div>

        </div>

    );
};
export default VideoPlayer;