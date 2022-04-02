import {FC, useState, useMemo, useEffect} from 'react';
import dynamic from "next/dynamic";
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import MobileCardImageRenderer from "../../../mobileAsset/MobileCardImageRenderer";
const VideoCardInfo = dynamic(() => import('../MobileVideoCardInfo'));
const MobileVideoCardTrailer = dynamic(() => import('./MobileVideoCardTrailer'), {ssr: false});

let MobileVideoCardMediaStyledDiv = styled.div`
  position: relative;
  &:after{
    display: block;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    content: '';
    background: #000;
    background: -moz-linear-gradient(top,rgba(255,255,255,0) 80%,#000 110%);
    background: -webkit-linear-gradient(top,rgba(255,255,255,0) 80%,#000 110%);
    background: linear-gradient(to bottom,rgba(255,255,255,0) 80%,#000 110%);
  }
  
  .video-card-image {
    width: 100%;
    height: calc(100% / 1.777);
    object-fit: contain;
  }

  .video-card-info-data {
    position: absolute;
    color: var(--post-element-text-color, #ccc);
    z-index: 1;
    margin: 0;
    --video-card-info-distance: 3px;
    padding: 2px;
    border-radius: 2px;
    display: flex;
    align-items: center;
  }
  
  .video-card-quality {
    bottom: 3px;
    right: 22%;
  }

  .video-card-duration {
    bottom: 3px;
    right: 2%;
  }
`

interface MobileVideoCardMediaPropTypes {
    post: PostTypes,
    mediaAlt: string,
    postsPerRawForMobile: number,
    quality: string,
    duration: string,
    index?:number
}

const VideoCardMedia: FC<MobileVideoCardMediaPropTypes> = 
    ({
         post,
         mediaAlt,
         postsPerRawForMobile,
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
            <MobileVideoCardTrailer hover={hover}
                                    hoverHandler={hoverHandler}
                                    videoTrailerUrl={videoTrailerUrlSource}
                                    postsPerRawForMobile={postsPerRawForMobile}
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
                <MobileCardImageRenderer imageUrl={post.mainThumbnail}
                                         postsPerRawForMobile={postsPerRawForMobile}
                                         mediaAlt={mediaAlt}
                                         index={index}
                />
                <VideoCardInfo duration={duration}
                               quality={quality}
                />
            </MobileVideoCardMediaStyledDiv>
        )
    }
};
export default VideoCardMedia;

