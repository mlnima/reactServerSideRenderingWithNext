import Link from "next/link";
import PromotionCardMedia from "./PromotionCardMedia";
import {likeDislikeView} from "@_variables/ajaxPostsVariables";
import {FC} from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))

let PromotionCardStyledDiv = styled.div`
  width: ${({cardWidth}: { cardWidth: number }) => `${cardWidth}px`};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
  background-color: var(--post-element-background-color, #131314);
  padding-bottom: 5px;
  margin: 7px;
  font-size: 14px;

  .promotion-card-under-media {
    width: 100%;
    font-size: 14px;

    .promotion-card-link-internal {
      width: 100%;
    }
  }
}

.promotion-card-link-external {
  width: 100%;
  
}

.promotion-card-under-media {
  width: calc(100% - 4px);
  margin-left: 0;
  height: 45px;


  .promotion-card-link-internal {
    height: 45px;
    width: 100%;
    text-decoration: none;
    color: var(--post-element-text-color, #ccc);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    h3 {
      font-weight: lighter;
      margin: 2px 0;
    }

    .promotion-card-under-media-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 2px;
      padding: 0 2px;
      color: var(--post-element-info-text-color, #ccc);

      .promotion-card-views, .promotion-card-rating {
        height: 12px;
        margin: 0;
        display: flex;
        align-items: center;
      }

      .icon {
        width: 14px;
        height: 14px;
        margin: 0 2px;
      }

      .thumbs-up {
        width: 12px;
        height: 12px;
      }
    }
  }
}

`

interface PromotionTypeCardPropTypes {
    onActivateLoadingHandler: any,
    title: string,
    postElementSize: string,
    views: number,
    rating: number,
    cardWidth: number,
    post: PostTypes,
}

const PromotionTypeCard: FC<PromotionTypeCardPropTypes> =
    ({
         post,
         onActivateLoadingHandler,
         title,
         cardWidth,
         postElementSize,
         views,
         rating
     }) => {
        const postUrl = `/post/${post.postType}/${post._id}`

        const onExternalLinkClickViewHandler = () => {
            likeDislikeView(post._id, 'views').finally()
        }

        const onInternalLinkClickHandler = () => {
            onActivateLoadingHandler()
            onExternalLinkClickViewHandler()
        }
// console.log(cardWidth)
        return (
            <PromotionCardStyledDiv className='promotion-card' cardWidth={cardWidth}>

                <a href={post.redirectLink} className={'promotion-card-link-external'}
                   onClick={onExternalLinkClickViewHandler}
                   target={'_blank'} rel={'nofollow noopener external'}
                >
                    <PromotionCardMedia postElementSize={postElementSize} post={post} cardWidth={cardWidth} mediaAlt={title}/>
                </a>
                <div className={'promotion-card-under-media'}>
                    <Link href={postUrl}>
                        <a className={'promotion-card-link-internal'} onClick={onInternalLinkClickHandler}>
                            <h3>{title}</h3>
                            <div className={'promotion-card-under-media-info'}>
                                {views ? <CardViews views={views} className={'promotion-card-views'}/> : null}
                                {rating ? <CardRating rating={rating} className={'promotion-card-rating'}/> : null}
                            </div>
                        </a>
                    </Link>
                </div>
            </PromotionCardStyledDiv>
        );
    };
export default PromotionTypeCard;
