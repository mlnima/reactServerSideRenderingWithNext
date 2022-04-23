import {FC, useState} from "react";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import CardImageRenderer from "@components/includes/cards/CardImageRenderer";
import VideoPostCardTrailer from "@components/includes/cards/VideoPostCardTrailer";
import _qualityConvertor from "@components/includes/cards/asset/_qualityConvertor";
import VideoPostCardActors from "@components/includes/cards/VideoPostCardActors";

const CardViews = dynamic(() => import('./asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('./asset/CardRating/CardRating'))
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
  background-color: var(--post-element-background-color, #131314);
  margin: 0 auto;
  width: 100%;

  .video-post-card-media {
    position: relative;
    color: var(--post-element-text-color, #ccc);

    .card-quality {
      position: absolute;
      bottom: 1px;
      right: 45px;
      z-index: 1;
    }

    .card-duration {
      position: absolute;
      bottom: 1px;
      right: 5px;
      z-index: 1;
    }

    &:after {
      display: block;
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      content: '';
      background: #000;
      background: -moz-linear-gradient(to top,#000 -14%, rgba(0, 0, 0, 0) 17%);
      background: -webkit-gradient(to top, color-stop(-14%, #000), color-stop(17%, rgba(0, 0, 0, 0)));
      background: -webkit-linear-gradient(to top,#000 -14%, rgba(0, 0, 0, 0) 17%);
      background: -o-linear-gradient(to top,#000 -14%, rgba(0, 0, 0, 0) 17%);
      background: -ms-linear-gradient(to top,#000 -14%, rgba(0, 0, 0, 0) 17%);
      background: linear-gradient(to top,#000 -14%, rgba(0, 0, 0, 0) 17%);
    }
  }


  .entry-header {
    text-align: center;
    margin: 2px 0;

    .card-header {
      color: var(--post-element-text-color, #ccc);
    }
  }

  .card-under-media-info {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin: 0;
    color: var(--post-element-info-text-color, #ccc);

    .card-under-media-info-data {
      display: flex;
      align-items: center;
      margin: 2px 0;
      padding: 0 2px;
      color: var(--post-element-info-text-color, #ccc);
      font-size: 12px;

      .icon {
        width: 14px;
        height: 14px;
        margin: 0 2px;
      }
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

        const hoverHandler = () => {
            hover ? setHover(false) : setHover(true)
        }


        return (
            <VideoPostCardStyle className={'post-card'}
                                cardWidth={cardWidth}
                                onMouseEnter={hoverHandler}
                                onMouseOut={hoverHandler}
                                onTouchStartCapture={hoverHandler}
                                onTouchEnd={hoverHandler}>

                <Link href={postUrl}>
                    <a rel={'next'} className={'card-link'} title={title}>

                        <div className={'video-post-card-media'}>
                            {hover && post?.videoTrailerUrl ?
                                <VideoPostCardTrailer videoTrailerUrl={post?.videoTrailerUrl}
                                                      hoverHandler={hoverHandler}
                                                      hover={hover}
                                                      postsPerRawForMobile={postsPerRawForMobile}
                                                      cardWidth={cardWidth}/> :
                                post.mainThumbnail ? <CardImageRenderer imageUrl={post.mainThumbnail}
                                                                        mediaAlt={title}
                                                                        index={index}
                                                                        postsPerRawForMobile={postsPerRawForMobile}
                                                                        cardWidth={cardWidth}/>
                                    :null
                            }

                            {!!post?.quality && <CardQuality quality={_qualityConvertor(post?.quality)}
                                                             className={'card-quality video-card-info-data'}/>
                            }

                            {!!post?.duration && <CardDuration duration={post?.duration}
                                                             className={'card-duration video-card-info-data'}/>
                            }
                        </div>
                    </a>
                </Link>

                {(!!post?.actors?.length || !!post?.updatedAt|| !!post?.createdAt) &&
                    <VideoPostCardActors actors={post?.actors}
                                         hover={hover}
                                         updatedAt={post?.updatedAt}
                                         createdAt={post?.createdAt}
                    />
                }

                <Link href={postUrl}>
                    <a rel={'next'} className={'card-link'} title={title}>

                        <header className={'entry-header'}>
                            <span className={'card-header'}>{title}</span>
                        </header>

                        <div className={'card-under-media-info'}>

                            {!!views && views >= 10 &&
                                 <CardViews views={views} className={'card-views card-under-media-info-data'}/>
                            }
                            {!!rating &&
                                  <CardRating rating={rating} className={'card-rating card-under-media-info-data'}/>
                            }

                        </div>

                    </a>
                </Link>
            </VideoPostCardStyle>
        )
    };
export default LearnPostCard


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