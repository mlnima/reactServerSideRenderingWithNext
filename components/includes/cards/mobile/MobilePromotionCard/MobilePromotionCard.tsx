import {FC} from "react";
import Link from "next/link";
import dynamic from 'next/dynamic'
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import MobilePromotionCardMedia from "./MobilePromotionCardMedia";
import {viewPost} from "@store/clientActions/postsAction";
import {useDispatch} from "react-redux";

const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))

const MobilePromotionCardStyledArticle = styled.article`

  width: ${({postsPerRawForMobile}: { postsPerRawForMobile: number }) => `calc(96vw / ${postsPerRawForMobile || 2})`};
  margin: 4px 2px;
  background-color: var(--post-element-background-color, #131314);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .promotion-card-link-external {
    color: var(--post-element-text-color, #ccc);
    position: relative;
    width: calc(100% - 4px);
    margin-bottom: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
  }

  .mobile-promotion-card-link-internal {
    color: var(--post-element-text-color, #ccc);
    width: 100%;

    .mobile-promotion-card-title {
      font-size: 14px;
      font-weight: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 2px;
      width: 100%;
    }

    .promotion-card-under-media {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 12px;

      .promotion-card-under-media-info {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin: 0;
        height: 20px;

        .promotion-card-info-data {
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
    }
  }
`

interface MobilePromotionCardPropTypes {
    onActivateLoadingHandler: any,
    title: string,
    views: number,
    rating: number
    post: PostTypes,
    postsPerRawForMobile: number,
}

const MobilePromotionCard: FC<MobilePromotionCardPropTypes> =
    ({
         post,
         onActivateLoadingHandler,
         title,
         postsPerRawForMobile,
         views,
         rating
     }) => {

        const dispatch = useDispatch();
        const postUrl = `/post/${post.postType}/${post._id}`;

        const onInternalLinkClickHandler = () => {
            onActivateLoadingHandler();
            // dispatch(viewPost(post._id));
        };

        return (
            <MobilePromotionCardStyledArticle className='promotion-card' postsPerRawForMobile={postsPerRawForMobile}>
                <a href={post.redirectLink} className='promotion-card-link-external'
                   onClick={() => dispatch(viewPost(post._id))} target='_blank' rel="nofollow noopener external">
                    <MobilePromotionCardMedia post={post}
                                              mediaAlt={title}
                                              postsPerRawForMobile={postsPerRawForMobile}
                    />
                </a>

                <Link href={postUrl}>
                    <a className='mobile-promotion-card-link-internal' title={title}
                       onClick={onInternalLinkClickHandler}>
                        <h3 className={'mobile-promotion-card-title'}>{title}</h3>
                        <div className='promotion-card-under-media'>
                            <div className='promotion-card-under-media-info'>
                                {views ? <CardViews views={views}
                                                    className={'promotion-card-views promotion-card-info-data'}/>
                                    : null
                                }
                                {rating ? <CardRating rating={rating}
                                                      className={'promotion-card-rating promotion-card-info-data'}/>
                                    : null
                                }
                            </div>
                        </div>
                    </a>
                </Link>
            </MobilePromotionCardStyledArticle>
        );
    };

export default MobilePromotionCard;
