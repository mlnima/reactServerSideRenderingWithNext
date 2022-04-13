import React, {useEffect, useRef, useMemo} from "react";
import styled from "styled-components";

const MobileVideoCardTrailerStyledDiv = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  @keyframes opacityAnimationStart {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100%;
    }
  }

  .video-card-trailer {
    object-fit: contain;
    aspect-ratio: 16 / 9;
    height: 100%;
    width: 100%;
    animation: opacityAnimationStart 2s alternate;
  }
`


interface ComponentPropTypes {
    hover: boolean,
    hoverHandler: any,
    videoTrailerUrl: string,
}

const MobileVideoCardTrailer = ({hover, hoverHandler, videoTrailerUrl}: ComponentPropTypes) => {
    const videoTrailer = useRef(null)
    const videoTrailerUrlSource = useMemo(() => videoTrailerUrl, [videoTrailerUrl])

    useEffect(() => {
        hover && videoTrailer?.current ?
            videoTrailer.current.play():
            null
    }, [hover]);

    return (
        <MobileVideoCardTrailerStyledDiv className={'video-card-media'} >
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
                Sorry, your browser doesn't support embedded videos.
            </video>


        </MobileVideoCardTrailerStyledDiv>
    )
};
export default MobileVideoCardTrailer


// width: ${({postsPerRawForMobile}: {postsPerRawForMobile:number}) => `calc(96vw  / ${postsPerRawForMobile || 1})`};
// height: ${({postsPerRawForMobile}: {postsPerRawForMobile:number}) => `calc((96vw  / ${postsPerRawForMobile || 1})  / 1.777)`};