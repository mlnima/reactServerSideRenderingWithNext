import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {PostTypes} from "../../../../_variables/TypeScriptTypes/PostTypes";
import VideoCardInfo from "./VideoCardInfo";

interface styleProps {
    cardWidth: number,
    postElementSize: string
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

  .video-card-trailer {

    width: ${(props: styleProps) => props.postElementSize === 'list' ? '116.6px' : '100%'};
    height: ${(props: styleProps) => props.postElementSize === 'list' ? 'calc(116.6px / 1.777)' : 'calc(50vw / 1.777)'};
    animation: opacityAnimationStart 2s alternate;
  }

  .video-card-image {
    width: ${(props: styleProps) => props.postElementSize === 'list' ? '116.6px' : '100%'};
    height: ${(props: styleProps) => props.postElementSize === 'list' ? 'calc(116.6px / 1.777)' : 'calc(50vw / 1.777)'};
    object-fit: contain;
  }

  .video-card-info-data {
    position: absolute;
    color: var(--main-active-color, #ccc);
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0;
    --video-card-info-distance: 3px;
    padding: 2px;
    border-radius: 2px;
    display: flex;
    align-items: center;

    .icon {
      width: 14px;
      height: 14px;
      margin: 0 2px;
    }

    .thumbs-up {
      width: 12px;
      height: 12px;
    }
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
      width: ${(props: styleProps) => props.postElementSize === 'list' ? '116.6px' : `${props.cardWidth}px`};
      height: calc(${(props: styleProps) => props.cardWidth}px / 1.777);
    }

    .video-card-trailer {
      width: ${(props: styleProps) => props.postElementSize === 'list' ? '116.6px' : `${props.cardWidth}px`};
      height: calc(${(props: styleProps) => props.cardWidth}px / 1.777);
    }
  }
`
const NoImageStyleDiv = styled.div`
  width: 100%;
  height: calc(48vw / 1.777);
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: var(--post-element-info-text-color, #ccc);
  }

  @media only screen and (min-width: 768px) {
    width: ${(props: { cardWidth?: number }) => props?.cardWidth}px;
    height: calc(${(props: { cardWidth?: number }) => props?.cardWidth}px / 1.777);
  }
`

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

const VideoCardMedia = (props: VideoCardMediaPropTypes) => {
    const videoTrailer = useRef(null)
    const [hover, setHover] = useState(false)
    const [gotError, setGotError] = useState(false)

    useEffect(() => {
        if (hover && videoTrailer?.current ){
            videoTrailer.current.play()
        }
    }, [hover]);
    const hoverHandler = () => {
        hover ? setHover(false) : setHover(true)
    }

    if (props.post?.videoTrailerUrl && hover) {
        return (
            <VideoCardMediaStyledDiv className={'video-card-media'}
                                     postElementSize={props.postElementSize}
                                     cardWidth={props.cardWidth}
            >
                <video
                    // @ts-ignore
                    ref={videoTrailer}
                   // onMouseOver={event => event.target.play()}
                    loop={false}
                    onMouseEnter={hoverHandler} onMouseOut={hoverHandler}
                    onTouchStartCapture={hoverHandler} onTouchEnd={hoverHandler}
                    muted
                    playsInline
                    className={'video-card-trailer'}>
                    <source src={props.post.videoTrailerUrl}/>
                    Sorry, your browser doesn't support embedded videos.
                </video>
                <VideoCardInfo views={props.views}
                               rating={props.rating}
                               duration={props.duration}
                               quality={props.quality}
                />
            </VideoCardMediaStyledDiv>
        )
    } else {

        if (!props?.post.mainThumbnail || gotError) {
            return (
                <NoImageStyleDiv cardWidth={props.cardWidth} className='no-image'>
                    <span className={'no-image-alt'}>{props.mediaAlt || 'NO IMAGE'}</span>
                </NoImageStyleDiv>
            )
        } else return (

            <VideoCardMediaStyledDiv className={'video-card-media'} postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
                <img className={'video-card-image'}
                     alt={props.mediaAlt}
                     src={props?.post.mainThumbnail}
                     onMouseEnter={hoverHandler} onMouseOut={hoverHandler}
                     onTouchStartCapture={hoverHandler} onTouchEnd={hoverHandler}
                     onError={() => setGotError(true)}
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

