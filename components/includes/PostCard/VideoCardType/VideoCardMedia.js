import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from "next/link";
import BottomLeft from "../BottomLeft";
import TopRight from "../TopRight";
import {checkRemovedContent} from "../../../../_variables/ajaxPostsVariables";
import {clientSelfWidgetUpdate} from "../../../../_variables/_ajaxClientWidgetVariables";

const VideoCardMedia = props => {
    const [hover, setHover] = useState(false)
    const [gotError, setGotError] = useState(false)
    const [isReported, setIsReported] = useState(false)

    const [imageUrl, setImageUrl] = useState(() => {
        return props?.post.mainThumbnail ? props.post.mainThumbnail?.includes('http') ? props.post.mainThumbnail : process.env.REACT_APP_PRODUCTION_URL + props.post.mainThumbnail : ''
    })

    const hoverHandler = () => {
        hover ? setHover(false) : setHover(true)
    }

    const onErrorHandler = e => {
        if (imageUrl) {
            setGotError(true)
            setIsReported(true)
            let data = {
                checkUrl: imageUrl,
                contentId: props.post._id,
                type: 'image'
            }
            setTimeout(() => {
                checkRemovedContent(data).then(() => {
                    if (props.widgetId) {
                        clientSelfWidgetUpdate(props.widgetId)
                    }
                })
            }, 1000)
        }
    }


    if (props.post.videoTrailerUrl && hover) {
        return (
            <video
                onMouseOver={event => event.target.play()}
                //onMouseOut={event => event.target.pause()}
                loop={false}
                onMouseEnter={hoverHandler} onMouseOut={hoverHandler}
                onTouchStartCapture={hoverHandler} onTouchEnd={hoverHandler}
                muted="muted"
                playsInline="playsinline"
                className='video-card-trailer'>
                <style jsx>{`
                  @keyframes opacityAnimationStart {
                    0% {
                      opacity: 0;
                    }
                    100% {
                      opacity: 100%;
                    }
                  }

                  .video-card-trailer {
                    width: ${props.postElementSize === 'list' ? '116.6px' : '100%'};
                  height: calc(48vw / 1.777);
                    animation: opacityAnimationStart 2s alternate;
                  }

                  @media only screen and (min-width: 768px) {
                    .video-card-trailer {
                      width: ${props.postElementSize === 'list' ? '116.6px' : '100%'};
                      height: calc(${props.cardWidth}px / 1.777);
                    }
                  }
                `}</style>
                <source src={props.post.videoTrailerUrl}/>
                Sorry, your browser doesn't support embedded videos.
            </video>
        )
    } else {
        return (
            <React.Fragment>
                <style jsx>{`
                  .video-card-image {
                    width: ${props.postElementSize === 'list' ? '116.6px' : '100%'};
                    height: calc(48vw / 1.777);
                  }

                  @media only screen and (min-width: 768px) {
                    .video-card-image {
                      width: ${props.postElementSize === 'list' ? '116.6px' : '100%'};
                      height: calc(${props.cardWidth}px / 1.777);
                      
                    }
                  }
                `}</style>
                <img className='video-card-image'
                     alt={props.mediaAlt || props.classNameValue}
                     src={!gotError ? imageUrl || props.noImageUrl : props.noImageUrl}
                     onMouseEnter={hoverHandler} onMouseOut={hoverHandler}
                     onTouchStartCapture={hoverHandler} onTouchEnd={hoverHandler}
                     onError={e => {
                         onErrorHandler(e)
                     }}/>

                {/*{props.post.views > 1 && props.post.postType === ('video') && !hover ? <BottomRight views={props.post.views}/> : null}*/}
                {/*{(props.post.postType === ('video') || props.post.postType === ('redirect') || props.post.postType === ('product')) && !hover ?*/}
                {/*    <BottomLeft type={props.post.postType} price={props.post.price} duration={props.post.duration}/> : null}*/}
                {/*{props.post.quality && props.post.postType === ('video') && !hover ? <TopRight quality={props.post.quality}/> : null}*/}
                {/*{props.post.likes > 0 && props.post.rating !== 'disable' && !hover ? <TopLeft rating={likeValueCalculator(props.post.likes, props.post.disLikes)} s/> : null}*/}
            </React.Fragment>
        )
    }
};
export default VideoCardMedia;
