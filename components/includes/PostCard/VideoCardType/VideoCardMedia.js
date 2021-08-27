import React, {useState} from 'react';
import {checkRemovedContent} from "../../../../_variables/ajaxPostsVariables";
import styled from "styled-components";

let VideoCardMediaStyled = styled.div`
  @keyframes opacityAnimationStart {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100%;
    }
  }

  .video-card-trailer {
    width: ${props => props.postElementSize === 'list' ? '116.6px' : '100%'};
    height: ${props => props.postElementSize === 'list' ? 'calc(116.6px / 1.777)' : 'calc(50vw / 1.777)'};
    animation: opacityAnimationStart 2s alternate;
  }

  .video-card-image {
    width: ${props => props.postElementSize === 'list' ? '116.6px' : '100%'};
    height: ${props => props.postElementSize === 'list' ? 'calc(116.6px / 1.777)' : 'calc(50vw / 1.777)'};
  }

  @media only screen and (min-width: 768px) {
    .video-card-image {
      width: ${props => props.postElementSize === 'list' ? '116.6px' : `${props => props.cardWidth}px`};
      height: calc(${props => props.cardWidth}px / 1.777);
    }

    .video-card-trailer {
      width: ${props => props.postElementSize === 'list' ? '116.6px' : `${props => props.cardWidth}px`};
      height: calc(${props => props.cardWidth}px / 1.777);
    }
  }

`

const VideoCardMedia = props => {
    const [hover, setHover] = useState(false)
    const [gotError, setGotError] = useState(false)
    const [isReported, setIsReported] = useState(false)

    const [imageUrl, setImageUrl] = useState(() => {
        return props?.post?.mainThumbnail ? props.post.mainThumbnail?.includes('http') ? props.post.mainThumbnail : process.env.REACT_APP_PRODUCTION_URL + props.post.mainThumbnail : ''
    })

    const hoverHandler = () => {
        hover ? setHover(false) : setHover(true)
    }

    const onErrorHandler = () => {
        if (imageUrl) {
            setGotError(true)
            setIsReported(true)
            let data = {
                checkUrl: imageUrl,
            }
            setTimeout(() => {
                checkRemovedContent(data)
            }, 1000)
        }
    }


    if (props.post?.VideoTrailerUrl && hover) {
        return (
            <VideoCardMediaStyled className='video-card-media' postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
                <video
                    onMouseOver={event => event.target.play()}
                    loop={false}
                    onMouseEnter={hoverHandler} onMouseOut={hoverHandler}
                    onTouchStartCapture={hoverHandler} onTouchEnd={hoverHandler}
                    muted="muted"
                    playsInline="playsinline"
                    className='video-card-trailer'>
                    <source src={props.post.VideoTrailerUrl}/>
                    Sorry, your browser doesn't support embedded videos.
                </video>
            </VideoCardMediaStyled>
        )
    } else {
        return (
            <VideoCardMediaStyled className='video-card-media' postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
                <img className='video-card-image'
                     alt={props.mediaAlt}
                     src={!gotError ? imageUrl || props.noImageUrl : props.noImageUrl}
                     onMouseEnter={hoverHandler} onMouseOut={hoverHandler}
                     onTouchStartCapture={hoverHandler} onTouchEnd={hoverHandler}
                     onError={onErrorHandler}/>
            </VideoCardMediaStyled>
        )
    }
};
export default VideoCardMedia;


// <style jsx>{`
//                   @keyframes opacityAnimationStart {
//                     0% {
//                       opacity: 0;
//                     }
//                     100% {
//                       opacity: 100%;
//                     }
//                   }
//
//                   .video-card-trailer {
//                     width: ${props.postElementSize === 'list' ? '116.6px' : '100%'};
//                     height: ${props.postElementSize === 'list' ? 'calc(116.6px / 1.777)' : 'calc(50vw / 1.777)'};
//                     animation: opacityAnimationStart 2s alternate;
//                   }
//
//                   @media only screen and (min-width: 768px) {
//                     .video-card-trailer {
//                       width: ${props.postElementSize === 'list' ? '116.6px' : `${props.cardWidth}px`};
//                       height: calc(${props.cardWidth}px / 1.777);
//                     }
//                   }
//                 `}</style>