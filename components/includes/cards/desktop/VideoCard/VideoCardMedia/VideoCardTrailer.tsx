import React, {useEffect, useRef, useMemo} from "react";
import styled from "styled-components";

interface VideoCardTrailerStyleProps {
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

const VideoCardTrailerStyledDiv = styled.div`
  position: relative;
  
  .video-card-trailer {
    margin: 0;
    width: ${(props: VideoCardTrailerStyleProps) => props.postElementSize === 'list' ? '116.6px' : `${props.cardWidth}px`};
    height: calc(${(props: VideoCardTrailerStyleProps) => props.cardWidth}px / 1.777);
    animation: opacityAnimationStart 2s alternate;
  }

  @keyframes opacityAnimationStart {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100%;
    }
  }
`

const VideoCardTrailer = ({hover, hoverHandler, postElementSize, cardWidth, videoTrailerUrl}: ComponentPropTypes) => {
    const videoTrailer = useRef(null)
    const videoTrailerUrlSource = useMemo(() => videoTrailerUrl, [videoTrailerUrl])

    useEffect(() => {
            hover && videoTrailer?.current ?
            videoTrailer.current.play():
            null
    }, [hover]);

    return (
        <VideoCardTrailerStyledDiv className={'video-card-media'}
                                   postElementSize={postElementSize}
                                   cardWidth={cardWidth}
        >
            <video ref={videoTrailer}
                   loop={false}
                   onMouseEnter={hoverHandler}
                   onMouseOut={hoverHandler}
                   onTouchStartCapture={hoverHandler}
                   onTouchEnd={hoverHandler}
                   muted
                   playsInline
                   className={'video-card-trailer'}>
                <source src={videoTrailerUrlSource}/>
                Sorry, your browser doesn't support this video.
            </video>


        </VideoCardTrailerStyledDiv>
    )
};
export default VideoCardTrailer
