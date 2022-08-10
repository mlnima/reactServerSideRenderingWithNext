import {FC} from "react";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import {fetchViewPost} from "@store_toolkit/clientReducers/postsReducer";
import {useAppDispatch} from "@store_toolkit/hooks";

const CardViews = dynamic(() => import('./asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('./asset/CardRating/CardRating'))
const CardLastUpdate = dynamic(() => import('./asset/CardLastUpdate/CardLastUpdate'));
const TextToCanvasImage = dynamic(() => import('@components/includes/cards/asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('@components/includes/cards/CardImageRenderer'))
// direction: ${({direction}: { direction: string }) => direction || 'ltr'};

interface PromotionPostCardPropTypes {
    title: string,
    postUrl: string,
    postsPerRawForMobile: number,
    views: number,
    rating: number,
    index: number,
    cardWidth: number,
    post: PostTypes,
}

interface PromotionPostCardStylePropTypes {
    cardWidth: number
}

const PromotionPostCardStyle = styled.article`
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
    display: flex;
    justify-content: space-between;
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
  }

  .last-update {
    font-size: 9px;
    margin: 4px;
    color: var(--post-element-info-text-color, #6A6A6A);
  }

  @media only screen and (min-width: 768px) {
    max-width: ${({cardWidth}: PromotionPostCardStylePropTypes) => cardWidth}px;
  }
`


const PromotionPostCard: FC<PromotionPostCardPropTypes> =
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
        //direction={direction}
        const dispatch = useAppDispatch();
        return (
            <PromotionPostCardStyle className={'post-card'} cardWidth={cardWidth}>
                <a href={post.redirectLink} className='promotion-card-link-external'
                   onClick={() => dispatch(fetchViewPost(post._id))} target='_blank' rel="nofollow noopener external">
                    {post.mainThumbnail ?
                        <CardImageRenderer imageUrl={post.mainThumbnail}
                                           mediaAlt={title}
                                           index={index}
                                           postsPerRawForMobile={postsPerRawForMobile}
                                           cardWidth={cardWidth}/> :
                        <TextToCanvasImage title={title}
                                           postsPerRawForMobile={postsPerRawForMobile}
                                           cardWidth={cardWidth}/>
                    }
                </a>

                <Link href={postUrl}>
                    <a className={'card-link'} title={title}>

                        <header className={'entry-header'}>
                            <span className={'card-header'}>{title}</span>
                        </header>

                        <div className={'card-under-media-info'}>
                            {!!views &&
                            <CardViews views={views} className={'card-views card-under-media-info-data'}/>
                            }
                            {!!rating &&
                            <CardRating rating={rating} className={'card-rating card-under-media-info-data'}/>
                            }
                        </div>

                        {(post?.updatedAt || post?.createdAt) &&
                        <CardLastUpdate targetedDate={post?.updatedAt || post?.createdAt}/>
                        }

                    </a>
                </Link>
            </PromotionPostCardStyle>
        )
    };
export default PromotionPostCard
