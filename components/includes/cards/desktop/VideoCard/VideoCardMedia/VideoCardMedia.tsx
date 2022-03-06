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
    noImageUrl: string,
    views: number,
    rating: number,
    quality: string,
    duration: string,
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
    width: 100%;
    height: calc(48vw / 1.777);
    object-fit: contain;
  }

  .video-card-info-data {
    position: absolute;
    color: var(--post-element-info-text-color, #ccc);
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0;
    --video-card-info-distance: 3px;
    padding: 2px;
    border-radius: 2px;
    display: flex;
    align-items: center;
  }

  .video-card-quality {
    top: 3px;
    left: 3px;
  }

  .video-card-duration {
    top: 3px;
    right: 3px;
  }

  .video-card-views {
    bottom: 3px;
    right: 3px;
  }

  .video-card-rating {
    bottom: var(--video-card-info-distance, 2px);
    left: var(--video-card-info-distance, 2px);
  }

  @media only screen and (min-width: 768px) {
    .video-card-image {
      width: ${(props: styleProps) => `${props.cardWidth}px`};
      height: ${(props: styleProps) => `calc(${props.cardWidth}/1.777)`};
    }

  }
`



const VideoCardMedia: FC<VideoCardMediaPropTypes> = (props) => {

    const [hover, setHover] = useState(false)
    const videoTrailerUrlSource = useMemo(() => props.post.videoTrailerUrl, [props.post])

    const hoverHandler = () => {
        hover ? setHover(false) : setHover(true)
    }

    useEffect(() => {
        hover ? setHover(false) : null
    }, [props.post]);

    if (props.post?.videoTrailerUrl && hover) {
        return (
            <VideoCardTrailer hover={hover}
                              hoverHandler={hoverHandler}
                              postElementSize={props.postElementSize}
                              cardWidth={props.cardWidth}
                              videoTrailerUrl={videoTrailerUrlSource}
            />
        )
    } else {

        return (

            <VideoCardMediaStyledDiv className={'video-card-media'}
                                     postElementSize={props.postElementSize}
                                     cardWidth={props.cardWidth}
                                     onMouseEnter={hoverHandler}
                                     onMouseOut={hoverHandler}
                                     onTouchStartCapture={hoverHandler}
                                     onTouchEnd={hoverHandler}
            >
                <CardImageRenderer imageUrl={props?.post.mainThumbnail}
                                   mediaAlt={props.mediaAlt}
                                   cardWidth={props.cardWidth}
                                   cardHeight={props.cardWidth / 1.777}
                />
                <VideoCardInfo views={props.views}
                               rating={props.rating}
                               duration={props.duration}
                               quality={props.quality}
                />
            </VideoCardMediaStyledDiv>
        )
    }
};
export default VideoCardMedia;

