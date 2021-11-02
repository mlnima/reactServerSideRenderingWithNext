import React, { useState} from 'react';
import styled from "styled-components";
import {PostTypes} from "../../../../_variables/TypeScriptTypes/PostTypes";

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
    width: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? '116.6px' : '100%'};
    height: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? 'calc(116.6px / 1.777)' : 'calc(50vw / 1.777)'};
    animation: opacityAnimationStart 2s alternate;
  }

  .video-card-image {
    width: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? '116.6px' : '100%'};
    height: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? 'calc(116.6px / 1.777)' : 'calc(50vw / 1.777)'};
  }

  @media only screen and (min-width: 768px) {
    .video-card-image {
      width: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? '116.6px' : `${props.cardWidth}px`};
      height: calc(${(props : {cardWidth:number,postElementSize:string}) => props.cardWidth}px / 1.777);
    }

    .video-card-trailer {
      width: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? '116.6px' : `${props.cardWidth}px`};
      height: calc(${(props : {cardWidth?:number,postElementSize?:string}) => props.cardWidth}px / 1.777);
    }
  }

`

const NoImageStyleDiv = styled.div`
  width: 100%;
  height: calc(48vw / 1.777);
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    color: var(--post-element-info-text-color,#ccc);
  }
  @media only screen and (min-width: 768px) {
    width:  ${(props : {cardWidth?:number}) => props?.cardWidth}px;
    height: calc(${(props : {cardWidth?:number}) => props?.cardWidth}px / 1.777);
  }
`

interface VideoCardMediaPropTypes {
    post:PostTypes,
    postElementSize:string,
    cardWidth:string,
    mediaAlt:string,
    noImageUrl:string,
}

const VideoCardMedia = (props:VideoCardMediaPropTypes) => {
    const [hover, setHover] = useState(false)
    const [gotError, setGotError] = useState(false)

    const hoverHandler = () => {
        hover ? setHover(false) : setHover(true)
    }

    if (props.post?.VideoTrailerUrl && hover) {

        return (
            // @ts-ignore
            <VideoCardMediaStyled className={'video-card-media'} postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
                <video
                    // @ts-ignore
                    onMouseOver={event => event.target.play()}
                    loop={false}
                    onMouseEnter={hoverHandler} onMouseOut={hoverHandler}
                    onTouchStartCapture={hoverHandler} onTouchEnd={hoverHandler}
                    // @ts-ignore
                    muted="muted"
                    // @ts-ignore
                    playsInline="playsinline"
                    className='video-card-trailer'>
                    <source src={props.post.VideoTrailerUrl}/>
                    Sorry, your browser doesn't support embedded videos.
                </video>
            </VideoCardMediaStyled>
        )
    } else {

        if (!props?.post.mainThumbnail || gotError){
            return (
                // @ts-ignore
                <NoImageStyleDiv cardWidth={props.cardWidth} className='no-image'>
                    <span className={'no-image-alt'}>{props.mediaAlt || 'NO IMAGE'}</span>
                </NoImageStyleDiv>
            )
        }else return (
            // @ts-ignore
            <VideoCardMediaStyled className='video-card-media' postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
                <img className='video-card-image'
                     alt={props.mediaAlt}
                     src={props?.post.mainThumbnail}
                     onMouseEnter={hoverHandler} onMouseOut={hoverHandler}
                     onTouchStartCapture={hoverHandler} onTouchEnd={hoverHandler}
                     onError={()=>setGotError(true)}
                />
            </VideoCardMediaStyled>
        )
    }
};
export default VideoCardMedia;

