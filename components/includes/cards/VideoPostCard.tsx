import {FC, useState} from "react";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import VideoPostCardTrailer from "@components/includes/cards/VideoPostCardTrailer";
import _qualityConvertor from "@components/includes/cards/asset/_qualityConvertor";
import CardViews from "./asset/CardViews/CardViews";
import CardTitle from "@components/includes/cards/asset/CardTitle/CardTitle";
import {Post} from "@_typeScriptTypes/Post";
import CardRating from "@components/includes/cards/asset/CardRating/CardRating";
import useTranslation from "next-translate/useTranslation";

const CardRatingBar = dynamic(() => import('./asset/CardRatingBar/CardRatingBar'))
const CardQuality = dynamic(() => import('./asset/CardQuality/CardQuality'))
const CardDuration = dynamic(() => import('./asset/CardDuration/CardDuration'))
const TextToCanvasImage = dynamic(() => import('@components/includes/cards/asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('@components/includes/cards/CardImageRenderer'))

interface VideoPostCardPropTypes {
    title: string,
    postUrl: string,
    postsPerRawForMobile: number,
    views: number,
    rating: number,
    index: number,
    cardWidth: number,
    targetLink: string,
    post: Post,
}

interface VideoPostCardStylePropTypes {
    cardWidth: number
}

const VideoPostCardStyle = styled.article`
  background-color: var(--post-element-background-color, #131314);
  margin: 0 auto;
  width: 100%;
  .video-post-card-media {
    position: relative;
    color: var(--post-element-text-color, #ccc);

    .card-quality, .card-duration, .card-views {
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
    
  }

  .card-under-title-info {
    color: var(--post-element-text-color, #ccc);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: small;
    padding: 0 5px;
    box-sizing: border-box;
    .card-views{
      margin-right: 10px;
      
      .card-views-count{
        margin-right: 5px;
      }
    }

    .card-under-title-info-data {
      display: flex;
      justify-content: center;
      align-items: center;
    }

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
         targetLink,
         index
     }) => {

        const [hover, setHover] = useState(null)
        const {t} = useTranslation()

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
                    <a className={'card-link'} title={title} target={targetLink}>

                        <div className={'video-post-card-media'}>

                            {((!hover || (hover && !post?.videoTrailerUrl)) && !!post.mainThumbnail) &&
                            <CardImageRenderer imageUrl={post.mainThumbnail}
                                               mediaAlt={title}
                                               index={index}
                                               postsPerRawForMobile={postsPerRawForMobile}
                                               cardWidth={cardWidth}/>
                            }

                            {((!hover || (hover && !post?.videoTrailerUrl)) && !post.mainThumbnail) &&
                            <TextToCanvasImage title={title}
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

                            {/*<CardViews views={views} className={'card-views card-under-media-info-data'}/>*/}

                        </div>
                        <div className={'video-post-card-info'}>
                            <CardTitle title={title}/>
                            <div className={'card-under-title-info'}>
                                {!!views &&
                                <p className={'card-under-title-info-data card-views'}>
                                    <span className={'card-views-count'}>{views}</span>
                                    <span >{t('common:Views')}</span>
                                </p>
                                }
                                {!!rating &&
                                <CardRating rating={rating} className={'card-rating card-under-title-info-data'}/>
                                }
                            </div>
                        </div>
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