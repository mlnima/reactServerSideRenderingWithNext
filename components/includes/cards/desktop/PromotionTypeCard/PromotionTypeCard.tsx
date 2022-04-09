import Link from "next/link";
import PromotionCardMedia from "./PromotionCardMedia";
import {FC} from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import {useDispatch} from "react-redux";
import {viewPost} from "@store/clientActions/postsAction";
const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))

let PromotionCardStyledArticle = styled.article`
  //width: 100%;
  //position: relative;
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: flex-start;
  //max-width: 100%;
  //background-color: var(--post-element-background-color, #131314);
  //padding-bottom: 5px;
  //font-size: 14px;
  background-color: var(--post-element-background-color, #131314);
  width: 100%;
  font-size: 14px;
  position: relative;
  display: block;
  cursor: pointer;

  .promotion-card-under-media {
    width: 100%;
    font-size: 14px;

    .promotion-card-link-internal {
      width: 100%;
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
    //height: 45px;
    width: 100%;
    text-decoration: none;
    color: var(--post-element-text-color, #ccc);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .card-header {
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
    views: number,
    rating: number,
    post: PostTypes,
    index?:number
}

const PromotionTypeCard: FC<PromotionTypeCardPropTypes> =
    ({
         post,
         onActivateLoadingHandler,
         title,
         views,
         rating,
         index
     }) => {
        const postUrl = `/post/${post?.postType}/${post._id}`
        const dispatch = useDispatch()

        const onInternalLinkClickHandler = () => {
            onActivateLoadingHandler()
        }

        return (
            <PromotionCardStyledArticle className='promotion-card' >

                <a href={post.redirectLink} className={'promotion-card-link-external'}
                   onClick={()=>dispatch(viewPost(post._id))}
                   target={'_blank'} rel={'nofollow noopener external'}>
                    <PromotionCardMedia  mediaAlt={title}  index={index} post={post}/>
                </a>

                <header className={'promotion-card-under-media'}>
                    <Link href={postUrl}>
                        <a className={'promotion-card-link-internal'} onClick={onInternalLinkClickHandler}>
                            <span className={'card-header'}>{title}</span>
                            <div className={'promotion-card-under-media-info'}>
                                {views ? <CardViews views={views} className={'promotion-card-views'}/> : null}
                                {rating ? <CardRating rating={rating} className={'promotion-card-rating'}/> : null}
                            </div>
                        </a>
                    </Link>
                </header>

            </PromotionCardStyledArticle>
        );
    };
export default PromotionTypeCard;
