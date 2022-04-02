import {FC, useState, useMemo, useEffect} from 'react';
import dynamic from "next/dynamic";
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import CardImageRenderer from "../../../asset/CardImageRenderer/CardImageRenderer";
const VideoCardInfo = dynamic(() => import('../VideoCardInfo'));
const VideoCardTrailer = dynamic(() => import('./VideoCardTrailer'), {ssr: false});

interface styleProps {
    cardWidth: number,
    postElementSize: string
}

interface VideoCardMediaPropTypes {
    post: PostTypes,
    postElementSize: string,
    cardWidth: number,
    mediaAlt: string,
    quality: string,
    duration: string,
    index?:number

}

let VideoCardMediaStyledDiv = styled.div`
  position: relative;

  @keyframes opacityAnimationStart {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100%;
    }
  }

  .video-card-image {
    width: ${({cardWidth}: styleProps) => `${cardWidth}px`};
    height: ${({cardWidth}: styleProps) => `calc(${cardWidth}/1.777)`};
    object-fit: contain;

  }

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



const VideoCardMedia: FC<VideoCardMediaPropTypes> =
    ({
         post,
         postElementSize,
         cardWidth,
         mediaAlt,
         quality,
         duration,
         index
    }) => {

    const [hover, setHover] = useState(false)
    const videoTrailerUrlSource = useMemo(() => post.videoTrailerUrl, [post])

    const hoverHandler = () => {
        hover ? setHover(false) : setHover(true)
    }

    useEffect(() => {
        hover ? setHover(false) : null
    }, [post]);

    if (post?.videoTrailerUrl && hover) {
        return (
            <VideoCardTrailer hover={hover}
                              hoverHandler={hoverHandler}
                              postElementSize={postElementSize}
                              cardWidth={cardWidth}
                              videoTrailerUrl={videoTrailerUrlSource}
            />
        )
    } else {

        return (

            <VideoCardMediaStyledDiv className={'video-card-media'}
                                     postElementSize={postElementSize}
                                     cardWidth={cardWidth}
                                     onMouseEnter={hoverHandler}
                                     onMouseOut={hoverHandler}
                                     onTouchStartCapture={hoverHandler}
                                     onTouchEnd={hoverHandler}
            >
                <CardImageRenderer imageUrl={post?.mainThumbnail}
                                   mediaAlt={mediaAlt}
                                   cardWidth={cardWidth}
                                   cardHeight={cardWidth / 1.777}
                                   index={index}
                />
                <VideoCardInfo duration={duration}
                               quality={quality}
                />
            </VideoCardMediaStyledDiv>
        )
    }
};

export default VideoCardMedia;

