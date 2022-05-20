import {FC, useState} from "react";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import CardImageRenderer from "@components/includes/cards/CardImageRenderer";
import VideoPostCardTrailer from "@components/includes/cards/VideoPostCardTrailer";
import _qualityConvertor from "@components/includes/cards/asset/_qualityConvertor";
import CardViews from "./asset/CardViews/CardViews";

const CardRatingBar = dynamic(() => import('./asset/CardRatingBar/CardRatingBar'))
const CardQuality = dynamic(() => import('./asset/CardQuality/CardQuality'))
const CardDuration = dynamic(() => import('./asset/CardDuration/CardDuration'))

interface VideoPostCardPropTypes {
    title: string,
    postUrl: string,
    postsPerRawForMobile: number,
    views: number,
    rating: number,
    index: number,
    cardWidth: number,
    post: PostTypes,
}

interface VideoPostCardStylePropTypes {
    cardWidth: number
}

const VideoPostCardStyle = styled.article`
  background: var(--post-element-background, #131314);
  margin: 0 auto;
  width: 100%;

  .video-post-card-media {
    position: relative;
    color: var(--post-element-text-color, #ccc);

    .card-quality, .card-duration, .card-views{
      background-color: #000;
      overflow: hidden;
      padding: 2.4px 4.8px;
    }
    .card-quality {
      font-weight: 900;
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 1;
      border-radius: 3px;
    }

    .card-duration {
      position: absolute;
      bottom: 5px;
      right: 5px;
      z-index: 1;
    }
    .card-views {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 5px;
      left: 5px;
      z-index: 1;
          .icon {
            width: 14px;
            height: 14px;
            margin: 0 2px;
          }
    }
  }
  .entry-header {
    text-align: center;
    margin: 2px 0;

    .card-header {
      color: var(--post-element-text-color, #ccc);
    }
  }


  .last-update {
    font-size: 9px;
    margin: 4px;
    color: var(--post-element-info-text-color, #6A6A6A);
  }

  @media only screen and (min-width: 768px) {
    max-width: ${({cardWidth}: VideoPostCardStylePropTypes) => cardWidth}px;
  }
`


const LearnPostCard: FC<VideoPostCardPropTypes> =
    ({
         post,
         title,
         postUrl,
         views,
         rating,
         postsPerRawForMobile,
         cardWidth,
         index
     }) => {

        const [hover, setHover] = useState(null)

        const hoverHandler = (status) => {
            setHover(status)
        }


        return (
            <VideoPostCardStyle className={'post-card'}
                                cardWidth={cardWidth}
                                onMouseEnter={() => hoverHandler(true)}
                                onMouseOut={() => hoverHandler(false)}
                                onTouchStartCapture={() => hoverHandler(true)}
                                onTouchEnd={() => hoverHandler(false)}>

                <Link href={postUrl}>
                    <a className={'card-link'} title={title}>

                        <div className={'video-post-card-media'}>

                            {((!hover || (hover && !post?.videoTrailerUrl)) && !!post.mainThumbnail) &&
                               <CardImageRenderer imageUrl={post.mainThumbnail}
                                               mediaAlt={title}
                                               index={index}
                                               postsPerRawForMobile={postsPerRawForMobile}
                                               cardWidth={cardWidth}/>
                            }


                            {(hover && !!post?.videoTrailerUrl) &&
                            <VideoPostCardTrailer videoTrailerUrl={post?.videoTrailerUrl}
                                                  hoverHandler={hoverHandler}
                                                  hover={hover}
                                                  postsPerRawForMobile={postsPerRawForMobile}
                                                  cardWidth={cardWidth}/>
                            }


                            {!!post?.quality &&
                            <CardQuality quality={_qualityConvertor(post?.quality)}
                                         className={'card-quality video-card-info-data'}/>}

                            {!!post?.duration &&
                            <CardDuration duration={post?.duration} className={'card-duration video-card-info-data'}/>}

                            <CardViews views={views} className={'card-views card-under-media-info-data'}/>

                        </div>
                {/*    </a>*/}
                {/*</Link>*/}



                {/*<Link href={postUrl}>*/}
                {/*    <a rel={'next'} className={'card-link'} title={title}>*/}
                        <CardRatingBar rating={rating} className={'card-rating card-under-media-info-data'}/>
                        <header className={'entry-header'}>
                            <span className={'card-header'}>{title}</span>
                        </header>
                    </a>
                </Link>
            </VideoPostCardStyle>
        )
    };
export default LearnPostCard


// {(!!post?.actors?.length || !!post?.updatedAt || !!post?.createdAt) &&
// <VideoPostCardActors actors={post?.actors}
//                      hover={hover}
//                      updatedAt={post?.updatedAt}
//                      createdAt={post?.createdAt}
// />
// }


// {!!rating &&
// <CardRating rating={rating} className={'card-rating card-under-media-info-data'}/>}


// {(post?.updatedAt || post?.createdAt) &&
// <CardLastUpdate targetedDate={post?.updatedAt || post?.createdAt}/>
// }

// {views && <CardViews views={views} className={'card-views card-under-media-info-data'}/>}

// {post.mainThumbnail && <CardImageRenderer imageUrl={post.mainThumbnail}
//                                           mediaAlt={title}
//                                           index={index}
//                                           postsPerRawForMobile={postsPerRawForMobile}
//                                           cardWidth={cardWidth}
//                                           isAppleMobileDevice={isAppleMobileDevice}/>
// }