import {FC} from 'react';
import dynamic from "next/dynamic";
import styled from "styled-components";
import CardImageRenderer from "../../../asset/CardImageRenderer/CardImageRenderer";

const VideoCardInfo = dynamic(() => import('../VideoCardInfo'));
const VideoCardTrailer = dynamic(() => import('./VideoCardTrailer'), {ssr: false});

let VideoCardMediaStyledDiv = styled.div`
  position: relative;
  
  .video-card-info-data {
    position: absolute;
    z-index: 1;
    color: var(--post-element-text-color, #ccc);
    margin: 0;
    --video-card-info-distance: 3px;
    padding: 2px;
    border-radius: 2px;
    display: flex;
    align-items: center;
  }

  .video-card-quality {
    bottom: 3px;
    right: 18%;

  }

  .video-card-duration {
    bottom: 3px;
    right: 2%;
  }
`

interface VideoCardMediaPropTypes {

    mediaAlt: string,
    videoTrailerUrl: string,
    mainThumbnail: string,
    quality: string,
    duration: string,
    hover: boolean,
    index?: number
}

const VideoCardMedia: FC<VideoCardMediaPropTypes> =
    ({
         videoTrailerUrl,
         mainThumbnail,
         mediaAlt,
         quality,
         duration,
         hover,
         index
     }) => {
        if (videoTrailerUrl && hover){
            return (
                <VideoCardTrailer hover={hover} videoTrailerUrl={videoTrailerUrl}/>
            )
        }else {
            return (
                <VideoCardMediaStyledDiv className={'video-card-media'} >
                    <CardImageRenderer imageUrl={mainThumbnail} mediaAlt={mediaAlt} index={index} />
                    <VideoCardInfo duration={duration} quality={quality}/>
                </VideoCardMediaStyledDiv>
            )
        }
    };

export default VideoCardMedia;


// onMouseEnter={hoverHandler}
// onMouseOut={hoverHandler}
// onTouchStartCapture={hoverHandler}
// onTouchEnd={hoverHandler}