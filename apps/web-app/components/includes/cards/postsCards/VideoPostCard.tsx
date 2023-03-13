import React, {FC, useState} from "react";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import VideoPostCardTrailer from "../asset/VideoPostCardTrailer";
import _qualityConvertor from "../asset/_qualityConvertor";
import CardTitle from "../asset/CardTitle/CardTitle";
import {Post} from "typescript-types";
import DefaultPostCardStyle from "../asset/DefaultPostCardStyle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";
import {faVideoSlash} from "@fortawesome/free-solid-svg-icons/faVideoSlash";

const CardViews = dynamic(() => import('../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../asset/CardRating/CardRating'))
const CardQuality = dynamic(() => import('../asset/CardQuality/CardQuality'))
const CardDuration = dynamic(() => import('../asset/CardDuration/CardDuration'))
const TextToCanvasImage = dynamic(() => import('../asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('../asset/CardImageRenderer'))

interface VideoPostCardPropTypes {
    title: string,
    postUrl: string,
    numberOfCardsPerRowInMobile: number,
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
   
      .card-quality, .card-duration {
        overflow: hidden;
        padding: 2.4px 4.8px;
        color: var(--secondary-text-color, #ccc);
        background-color: var(--secondary-background-color, #222);
        border-radius: 3px;
        position: absolute;
        z-index: 1;
      }

      .card-quality {
        font-weight: 900;
        top: 5px;
        right: 5px;
      }

      .card-duration {
        bottom: 5px;
        right: 5px;
      }

    }
    .mobile-play-trailer-button{
      opacity: 50%;
      position: absolute;
      background-color:var(--main-background-color,#000) ;
      color:var(--main-text-color,#fff)  ;
      border-radius: 50%;
      padding: 5px;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 3%;
      left: 3%;
      cursor: pointer;
    }
  }

  @media only screen and (min-width: 768px) {
    .video-post-card-media{
      .card-link{
        .mobile-play-trailer-button{
          //display: none;
        }
      }
    }
    
    
    
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
         numberOfCardsPerRowInMobile,
         cardWidth,
         targetLink,
         index
     }) => {

        const [hover, setHover] = useState(false)

        const hoverHandler = (status) => {
            setHover(status)
        }


        return (
            <VideoPostCardStyle className={'post-card'}
                                cardWidth={cardWidth}>
                <div className={'video-post-card-media'}>
                    <Link href={postUrl} className={'card-link'} title={title} target={targetLink}>




                        {((!hover || (hover && !post?.videoTrailerUrl)) && !!post.mainThumbnail) &&
                            <CardImageRenderer imageUrl={post.mainThumbnail}
                                               mediaAlt={title}
                                               index={index}
                                               numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                               cardWidth={cardWidth}/>
                        }

                        {((!hover || (hover && !post?.videoTrailerUrl)) && !post.mainThumbnail) &&
                            <TextToCanvasImage title={title}
                                               numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                               cardWidth={cardWidth}/>
                        }


                        {(hover && !!post?.videoTrailerUrl) &&
                            <VideoPostCardTrailer videoTrailerUrl={post?.videoTrailerUrl}
                                                  hover={hover}
                                                  numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                                  cardWidth={cardWidth}/>
                        }


                        {!!post?.quality &&
                            <CardQuality quality={_qualityConvertor(post?.quality)}
                                         className={'card-quality video-card-info-data'}/>}

                        {!!post?.duration &&
                            <CardDuration duration={post?.duration} className={'card-duration video-card-info-data'}/>}


                    </Link>
                    {!!post?.videoTrailerUrl && <FontAwesomeIcon className={'mobile-play-trailer-button'}
                                                                 onClick={() => hoverHandler(!hover)}
                                                                 icon={hover ? faVideoSlash :faVideo}
                                                                 style={{width: 25, height: 25}}/>
                    }
                </div>
                <CardTitle title={title} targetLink={targetLink} url={postUrl}/>

                {(!!views || !!rating) && (
                    <div className={'card-under-media-info'}>
                        {!!views && <CardViews views={views}/>}
                        {!!rating && <CardRating rating={rating} className={'card-rating card-under-title-info-data'}/>}
                    </div>
                )}


            </VideoPostCardStyle>
        )
    };
export default LearnPostCard

