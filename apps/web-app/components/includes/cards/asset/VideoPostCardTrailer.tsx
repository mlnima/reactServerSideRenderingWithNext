import React, {FC, useEffect, useMemo, useRef} from "react";
import styled from "styled-components";

interface VideoPostCardMediaPropTypes {
    videoTrailerUrl: string,
    hover: boolean,
    numberOfCardsPerRowInMobile: number,
    cardWidth: number,
}

interface VideoPostCardTrailerStylePropTypes {
    numberOfCardsPerRowInMobile: number,
    cardWidth: number,
}

const VideoPostCardTrailerStyle = styled.div`

  width: 100%;
  height: ${({numberOfCardsPerRowInMobile}: VideoPostCardTrailerStylePropTypes) => 96 / numberOfCardsPerRowInMobile / 1.777}vw;
  aspect-ratio: 16 / 9;
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
    width: 100%;
    height: ${({numberOfCardsPerRowInMobile}: VideoPostCardTrailerStylePropTypes) => 96 / numberOfCardsPerRowInMobile / 1.777}vw !important;
    aspect-ratio: 16 / 9;
    object-fit: contain;
    animation: opacityAnimationStart 2s alternate;
  }


  @media only screen and (min-width: 768px) {
    width: ${({cardWidth}: VideoPostCardTrailerStylePropTypes) => cardWidth}px;
    height: ${({cardWidth}: VideoPostCardTrailerStylePropTypes) => cardWidth / 1.777}px !important;
    .video-card-trailer {
      width: ${({cardWidth}: VideoPostCardTrailerStylePropTypes) => cardWidth}px;
      height: ${({cardWidth}: VideoPostCardTrailerStylePropTypes) => cardWidth / 1.777}px !important;
    }
  }
`
const VideoPostCardTrailer: FC<VideoPostCardMediaPropTypes> =
    ({
         videoTrailerUrl,
         hover,
         cardWidth,
         numberOfCardsPerRowInMobile
     }) => {

        const videoTrailer = useRef(null)
        const videoTrailerUrlSource = useMemo(() => videoTrailerUrl, [videoTrailerUrl])

        useEffect(() => {
            (hover && videoTrailer?.current) && playTrailer()
        }, [hover]);

        const playTrailer = () => {
            try {
                setTimeout(()=>{
                     //@ts-ignore
                     videoTrailer?.current?.play()

                },100)

            } catch (err) {

            }
        }

        const pauseTrailer  = ()=>{
            try {
                //@ts-ignore
                videoTrailer?.current?.pause()
            } catch (err) {

            }
        }

        return (
            <VideoPostCardTrailerStyle numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile} cardWidth={cardWidth}>
                <video ref={videoTrailer}
                       loop={false}
                       muted
                       playsInline
                       className={'video-card-trailer'}>
                    <source src={videoTrailerUrlSource}/>
                    Sorry, your browser doesn't support embedded videos.
                </video>
            </VideoPostCardTrailerStyle>
        )
    };
export default VideoPostCardTrailer
// onMouseEnter={hoverHandler}
// onTouchStartCapture={hoverHandler}