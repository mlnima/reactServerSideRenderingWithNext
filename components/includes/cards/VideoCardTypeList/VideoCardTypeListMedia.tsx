import {useState} from 'react';
import {PostTypes} from "../../../../_variables/TypeScriptTypes/PostTypes";
import styled from "styled-components";

let VideoCardTypeListMediaStyledDiv = styled.div`
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
    width: 100%;
    animation: opacityAnimationStart 2s alternate;
    object-fit: contain;
  }

  .video-card-image {
    width: 100%;
    object-fit: contain;
  }
`

const NoImageStyleDiv = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: var(--post-element-info-text-color, #ccc);
  }


`

interface VideoCardTypeListMediaPropTypes {
    post: PostTypes,
    postElementSize: string,
    cardWidth: number,
    mediaAlt: string,
}

const VideoCardTypeListMedia = (props: VideoCardTypeListMediaPropTypes) => {
    const [hover, setHover] = useState(false)
    const [gotError, setGotError] = useState(false)

    const hoverHandler = () => {
        hover ? setHover(false) : setHover(true)
    }

    if (props.post?.VideoTrailerUrl && hover) {
        return (
            // @ts-ignore
            <VideoCardTypeListMediaStyledDiv className={'video-card-media'} postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
                <video
                    // @ts-ignore
                    onMouseOver={event => event.target.play()}
                    loop={false}
                    onMouseEnter={hoverHandler} onMouseOut={hoverHandler}
                    onTouchStartCapture={hoverHandler} onTouchEnd={hoverHandler}
                    muted
                    playsInline
                    className='video-card-trailer'>
                    <source src={props.post.VideoTrailerUrl}/>
                    Sorry, your browser doesn't support embedded videos.
                </video>
            </VideoCardTypeListMediaStyledDiv>
        )

    } else {
        if (!props?.post.mainThumbnail || gotError) {
            return (
                // @ts-ignore
                <NoImageStyleDiv cardWidth={props.cardWidth} className='no-image'>
                    <span className={'no-image-alt'}>{props.mediaAlt || 'NO IMAGE'}</span>
                </NoImageStyleDiv>
            )
        } else return (
            // @ts-ignore
            <VideoCardTypeListMediaStyledDiv className={'video-card-list-media'} postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
                <img className='video-card-image'
                     alt={props.mediaAlt}
                     src={props?.post.mainThumbnail}
                     onMouseEnter={hoverHandler} onMouseOut={hoverHandler}
                     onTouchStartCapture={hoverHandler} onTouchEnd={hoverHandler}
                     onError={() => setGotError(true)}
                />
            </VideoCardTypeListMediaStyledDiv>
        )
    }
};
export default VideoCardTypeListMedia;

