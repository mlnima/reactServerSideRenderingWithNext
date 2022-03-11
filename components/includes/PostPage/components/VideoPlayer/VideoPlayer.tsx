import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {FC} from "react";

const VideoPlayerStyledDiv = styled.div`
  margin: 0;
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;

  .responsive-player {
    overflow: hidden;
    position: relative;
    padding-bottom: 56.30%;
    margin-bottom: 20px;
    height: 0;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin-bottom: 50px;
    padding: 0 !important;
  }

  .video-player-video-type {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin-bottom: 50px;
    outline: none;
    border-radius: 10px;
  }

  @media only screen and (min-width: 768px) {
    max-width: 1300px;
  }
`


const VideoPlayer :FC = () => {

  const {title,
      _id,
      description,
      duration,
      videoUrl,
      mainThumbnail,
      videoEmbedCode,
      updatedAt,
      videoScriptCode
  } = useSelector(({posts}:StoreTypes)=>posts.post)

    return (
        <VideoPlayerStyledDiv className='video-player'>

            <meta itemProp="name" content={title}/>
            <meta itemProp="description" content={description as string}/>
            <meta itemProp="duration" content={duration}/>
            <meta itemProp="thumbnailUrl" content={mainThumbnail}/>
            <meta itemProp="embedURL" content={videoUrl || videoEmbedCode}/>
            <meta itemProp="uploadDate" content={updatedAt}/>
            <div className="responsive-player">
                {videoUrl ?
                    <video className='video-player-video-type' controls controlsList=" nodownload" poster={mainThumbnail} preload="none">
                        <source src={videoUrl}/>
                    </video>
                    : videoEmbedCode && !videoUrl ?
                        <iframe className={_id} allow="fullscreen" title={title} src={videoEmbedCode}  frameBorder="0" width='640' height='360' />
                        : !videoUrl && !videoEmbedCode && videoScriptCode ?
                            videoScriptCode :
                            null
                }
            </div>

        </VideoPlayerStyledDiv>

    );
};
export default VideoPlayer;