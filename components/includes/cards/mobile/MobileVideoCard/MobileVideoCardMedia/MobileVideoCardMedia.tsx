import {FC, useState, useMemo, useEffect} from 'react';
import dynamic from "next/dynamic";
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import MobileCardImageRenderer from "../../../mobileAsset/MobileCardImageRenderer";
const VideoCardInfo = dynamic(() => import('../MobileVideoCardInfo'));
const MobileVideoCardTrailer = dynamic(() => import('./MobileVideoCardTrailer'), {ssr: false});

let MobileVideoCardMediaStyledDiv = styled.div`
  position: relative;
  
  .video-card-image {
    width: 100%;
    height: calc(100% / 1.777);
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
`

interface MobileVideoCardMediaPropTypes {
    post: PostTypes,
    mediaAlt: string,
    noImageUrl: string,
    views: number,
    rating: number,
    postsPerRawForMobile: number,
    quality: string,
    duration: string,
}

const VideoCardMedia: FC<MobileVideoCardMediaPropTypes> = (props) => {

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
            <MobileVideoCardTrailer hover={hover}
                                    hoverHandler={hoverHandler}
                                    videoTrailerUrl={videoTrailerUrlSource}
                                    postsPerRawForMobile={props?.postsPerRawForMobile}
            />
        )
    } else {

        return (

            <MobileVideoCardMediaStyledDiv className={'mobile-video-card-media'}
                                           onMouseEnter={hoverHandler}
                                           onMouseOut={hoverHandler}
                                           onTouchStartCapture={hoverHandler}
                                           onTouchEnd={hoverHandler}
            >
                <MobileCardImageRenderer imageUrl={props?.post.mainThumbnail}
                                         postsPerRawForMobile={props?.postsPerRawForMobile}
                                         mediaAlt={props.mediaAlt}
                />
                <VideoCardInfo views={props.views}
                               rating={props.rating}
                               duration={props.duration}
                               quality={props.quality}
                />
            </MobileVideoCardMediaStyledDiv>
        )
    }
};
export default VideoCardMedia;

