import React, {FC, useState} from "react";
import Link from "next/link";
import styled from "styled-components";
import dynamic from "next/dynamic";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import CardMetaRenderer from "@components/includes/cards/asset/CardMetaData/CardMetaRenderer";
import VideoCardTitle from './VideoCardTitle'

const CardLastUpdate = dynamic(() => import('../../asset/CardLastUpdate/CardLastUpdate'), {ssr: false});
const CardViews = dynamic(() => import('@components/includes/cards/asset/CardViews/CardViews'));
const CardRating = dynamic(() => import('@components/includes/cards/asset/CardRating/CardRating'));
const VideoCardMedia = dynamic(() => import('./VideoCardMedia/VideoCardMedia'));

let VideoCardStyledArticle = styled.article`
  background-color: var(--post-element-background-color, #131314);
  width: 100%;
  max-width: ${({cardWidth}:{cardWidth:number,videoTrailerUrl:string})=>`${cardWidth}px`};
  font-size: 14px;

  @keyframes opacityAnimationStart {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100%;
    }
  }
  //@keyframes opacityAnimationEnd {
  //  0% {
  //    opacity: 100%;
  //  }
  //  100% {
  //    opacity: 0;
  //  }
  //}

${({videoTrailerUrl}:{cardWidth:number,videoTrailerUrl:string})=> videoTrailerUrl ? `

  &:hover {
    transition: transform .5s;
    transform: scale(1.1);
    z-index: 2;
    animation: .5s opacityAnimationStart;
  }
`:'' }


  .video-card-media-link {
    position: relative;
    display: block;
    //cursor: pointer;
    &:after {
      display: block;
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      content: '';
      background: #000;
      background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 80%, #000 110%);
      background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 80%, #000 110%);
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 80%, #000 110%);

      //background: -webkit-gradient(top,rgba(255,255,255,0) 80%,#000 110%);
      //background: -o-linear-gradient(top,rgba(255,255,255,0) 80%,#000 110%);
      //background: -ms-linear-gradient(to bottom,rgba(255,255,255,0) 80%,#000 110%);
    }
  }


  .views-rating {
    height: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .video-card-views, .video-card-rating {
      color: var(--post-element-info-text-color, #6A6A6A);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

  }

  .card-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .last-update {
      font-size: 9px;
      margin: 4px;
      color: var(--post-element-info-text-color, #6A6A6A);
    }
  }


`

interface VideoTypeCardPropTypes {
    onActivateLoadingHandler: any,
    title: string,
    cardWidth: number,
    views: number,
    rating: number,
    index?: number,
    post: PostTypes,
}

const VideoCard: FC<VideoTypeCardPropTypes> =
    ({
         post,
         onActivateLoadingHandler,
         title,
         views,
         rating,
         index,
         cardWidth
     }) => {
        const [hover, setHover] = useState(false)
        const postUrl = `/post/${post?.postType}/${post._id}`

        return (
            <VideoCardStyledArticle className={'video-card'}
                                    onMouseEnter={() => setHover(true)}
                                    onMouseOver={() => setHover(true)}
                                    onMouseOut={() => setHover(false)}
                                    onTouchStartCapture={() => setHover(true)}
                                    onMouseDown={() => setHover(false)}
                                    videoTrailerUrl={post.videoTrailerUrl}
                                    cardWidth={cardWidth}
            >
                <Link href={postUrl}>
                    <a rel={'next'}
                       className={'video-card-media-link'}
                       title={title}
                       onClick={onActivateLoadingHandler}
                    >
                        <VideoCardMedia mediaAlt={title}
                                        videoTrailerUrl={post.videoTrailerUrl}
                                        mainThumbnail={post.mainThumbnail}
                                        duration={post.duration}
                                        quality={post.quality}
                                        index={index}
                                        hover={hover}
                        />
                    </a>
                </Link>
                <VideoCardTitle title={title}
                                postUrl={postUrl}
                                onActivateLoadingHandler={onActivateLoadingHandler}
                />
                {views || rating ?
                    <div className={'views-rating'}>
                        {views ? <CardViews views={views} className={'video-card-views'}/> : null}
                        {rating ? <CardRating rating={rating} className={'video-card-rating'}/> : null}
                    </div>
                    : null
                }


                <div className={'card-info'}>
                    <CardMetaRenderer metas={[...post?.actors || [], ...post?.tags || [], ...post?.categories || []]}/>
                    {post?.updatedAt || post?.createdAt ?
                        <CardLastUpdate targetedDate={post?.updatedAt || post?.createdAt}/>
                        : null
                    }
                </div>


            </VideoCardStyledArticle>
        );
    };
export default VideoCard;
