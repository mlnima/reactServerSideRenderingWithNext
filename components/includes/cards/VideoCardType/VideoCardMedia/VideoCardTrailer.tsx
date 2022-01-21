import React, {useEffect, useRef} from "react";
import styled from "styled-components";

const VideoCardTrailerStyledDiv = styled.div`
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

  @media only screen and (min-width: 768px) {
    .video-card-trailer {
      width: ${(props: styleProps) => props.postElementSize === 'list' ? '116.6px' : `${props.cardWidth}px`};
      height: calc(${(props: styleProps) => props.cardWidth}px / 1.777);
    }
  }

`

interface styleProps {
    cardWidth: number,
    postElementSize: string
}

interface ComponentPropTypes {
    hover: boolean,
    hoverHandler: any,
    videoTrailerUrl: string,
    postElementSize: string,
    cardWidth: number,
}

const VideoCardTrailer =
    ({hover, hoverHandler,postElementSize, cardWidth, videoTrailerUrl}: ComponentPropTypes) => {

    const videoTrailer = useRef(null)

    useEffect(() => {
        if (hover && videoTrailer?.current) {
            videoTrailer.current.play()
        }
    }, [hover]);

    return (
        <VideoCardTrailerStyledDiv className={'video-card-media'}
                                   postElementSize={postElementSize}
                                   cardWidth={cardWidth}
        >
            <video ref={videoTrailer}
                   loop={false}
                   onMouseEnter={hoverHandler} onMouseOut={hoverHandler}
                   onTouchStartCapture={hoverHandler} onTouchEnd={hoverHandler}
                   muted
                   playsInline
                   className={'video-card-trailer'}>
                <source src={videoTrailerUrl}/>
                Sorry, your browser doesn't support embedded videos.
            </video>


        </VideoCardTrailerStyledDiv>
    )
};
export default VideoCardTrailer
