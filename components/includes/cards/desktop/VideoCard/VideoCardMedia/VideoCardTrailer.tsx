import React, {useEffect, useRef, useMemo, FC} from "react";
import styled from "styled-components";

interface VideoCardTrailerPropTypes {
    videoTrailerUrl: string,
    hover: boolean,
}

const VideoCardTrailerStyledDiv = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  position: relative;
  height: 100%;
  

  
  video{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

const VideoCardTrailer:FC<VideoCardTrailerPropTypes> = ({hover, videoTrailerUrl}) => {
    const videoTrailer = useRef(null)
    const videoTrailerUrlSource = useMemo(() => videoTrailerUrl, [videoTrailerUrl])

    useEffect(() => {
            hover && videoTrailer?.current ?
            videoTrailer.current.play():
            null
    }, [hover]);

    return (
        <VideoCardTrailerStyledDiv className={'video-card-media'}>
            <video ref={videoTrailer}
                   loop={false}
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


// position: relative;
//
// .video-card-trailer {
//   margin: 0;
//   width: ${(props: VideoCardTrailerStyleProps) => props.postElementSize === 'list' ? '116.6px' : `${props.cardWidth}px`};
//   height: calc(${(props: VideoCardTrailerStyleProps) => props.cardWidth}px / 1.777);
//   animation: opacityAnimationStart 2s alternate;
// }
//
// @keyframes opacityAnimationStart {
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 100%;
//   }
// }