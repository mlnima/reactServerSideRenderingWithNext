import {FC} from "react";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import CardImageRenderer from "@components/includes/cards/CardImageRenderer";

const CardViews = dynamic(() => import('./asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('./asset/CardRating/CardRating'))
const CardLastUpdate = dynamic(() => import('./asset/CardLastUpdate/CardLastUpdate'));

// direction: ${({direction}: { direction: string }) => direction || 'ltr'};

interface LearnPostCardPropTypes {
    onActivateLoadingHandler: any,
    title: string,
    direction: string,
    postUrl: string,
    postsPerRawForMobile: number,
    views: number,
    rating: number,
    index: number,
    cardWidth: number,
    post: PostTypes,
    isAppleMobileDevice: boolean
}

interface LearnPostCardStylePropTypes {
    cardWidth: number
}

const LearnPostCardStyle = styled.article`
  background-color: var(--post-element-background-color, #131314);
  margin: 0 auto;
  width: 100%;

  .entry-header {
    text-align: center;
    margin-top: 2px;
    .card-header {
      color: var(--post-element-text-color, #ccc);
    }
  }

  .card-under-media-info {
    font-size: 14px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0;

    .card-under-media-info-data {
      display: flex;
      justify-content: center;
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

    .card-views {
      justify-self: flex-start;
    }

    .card-rating {
      justify-self: flex-end;
    }
  }

  .last-update {
    font-size: 9px;
    margin: 4px;
    color: var(--post-element-info-text-color, #6A6A6A);
  }

  @media only screen and (min-width: 768px) {
    max-width: ${({cardWidth}: LearnPostCardStylePropTypes) => cardWidth}px;
  }
`


const LearnPostCard: FC<LearnPostCardPropTypes> =
    ({
         post,
         onActivateLoadingHandler,
         title,
         postUrl,
         direction,
         views,
         rating,
         postsPerRawForMobile,
         cardWidth,
         index
     }) => {
        //direction={direction}
        return (
            <LearnPostCardStyle className={'post-card'} cardWidth={cardWidth}>
                <Link href={postUrl}>
                    <a rel={'next'} onClick={onActivateLoadingHandler} className={'card-link'} title={title}>
                        {post.mainThumbnail && <CardImageRenderer imageUrl={post.mainThumbnail}
                                                                  mediaAlt={title}
                                                                  index={index}
                                                                  postsPerRawForMobile={postsPerRawForMobile}
                                                                  cardWidth={cardWidth}/>
                        }
                        <header className={'entry-header'}>
                            <span className={'card-header'}>{title}</span>
                        </header>
                        <div className={'card-under-media-info'}>
                            {views ?
                            <CardViews views={views} className={'card-views card-under-media-info-data'}/>
                                :null
                            }
                            {rating ? <CardRating rating={rating} className={'card-rating card-under-media-info-data'}/>
                                :null
                            }

                        </div>
                        {(post?.updatedAt || post?.createdAt) &&
                        <CardLastUpdate targetedDate={post?.updatedAt || post?.createdAt}/>
                        }

                    </a>
                </Link>
            </LearnPostCardStyle>
        )
    };
export default LearnPostCard
