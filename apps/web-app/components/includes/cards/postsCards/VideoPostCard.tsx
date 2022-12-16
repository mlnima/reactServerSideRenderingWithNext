import {FC, useState} from "react";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import VideoPostCardTrailer from "../asset/VideoPostCardTrailer";
import _qualityConvertor from "../asset/_qualityConvertor";
import CardTitle from "../asset/CardTitle/CardTitle";
import {Post} from "typescript-types";
import useTranslation from "next-translate/useTranslation";
import DefaultPostCardStyle from "../asset/DefaultPostCardStyle";
import CardViews from "@components/includes/cards/asset/CardViews/CardViews";

const CardRating = dynamic(() => import('../asset/CardRating/CardRating'))
const CardQuality = dynamic(() => import('../asset/CardQuality/CardQuality'))
const CardDuration = dynamic(() => import('../asset/CardDuration/CardDuration'))
const TextToCanvasImage = dynamic(() => import('../asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('../asset/CardImageRenderer'))

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

const VideoPostCardStyle = styled(DefaultPostCardStyle)`

  .video-post-card-media {
    position: relative;
    color: var(--secondary-text-color, #ccc);

    .card-link {
      .card-quality, .card-duration, .card-views {
        background-color: #000;
        overflow: hidden;
        padding: 2.4px 4.8px;
        color: var(--secondary-text-color, #ccc);
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


                <div className={'video-post-card-media'}>
                    <Link href={postUrl} className={'card-link'} title={title} target={targetLink}>
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
                    </Link>
                </div>
                <CardTitle title={title} targetLink={targetLink} url={postUrl}/>
                <div className={'card-under-media-info'}>

                    <CardViews views={views}/>
                    {!!rating &&
                        <CardRating rating={rating} className={'card-rating card-under-title-info-data'}/>
                    }
                </div>

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