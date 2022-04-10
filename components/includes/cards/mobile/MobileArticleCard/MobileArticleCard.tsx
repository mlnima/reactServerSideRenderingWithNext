import {FC} from "react";
import Link from "next/link";
import dynamic from 'next/dynamic'
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import MobileArticleCardMedia from "./MobileArticleCardMedia";

const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))
const CardLastUpdate = dynamic(() => import('../../asset/CardLastUpdate/CardLastUpdate'));

const MobileArticleCardStyledArticle = styled.article`

  background-color: var(--post-element-background-color, #131314);
  width: 100%;
  max-width: ${({cardWidth}: { cardWidth: number }) => `${cardWidth}px`};
  font-size: 14px;

  .mobile-article-card-link {
    color: var(--post-element-text-color, #ccc);
    position: relative;
    display: block;


    .entry-header {
      font-weight: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 14px;
      width: 100%;
      overflow-wrap: break-word;

      .card-header {
        margin: 2px 0;
      }
    }

    .article-card-under-media {
      width: calc(100% - 4px);
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .mobile-article-card-under-media-info {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin: 0;
        // height: 20px;

        .article-card-info-data {
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

        .last-update {

          font-size: 9px;
          margin: 4px;
          color: var(--post-element-info-text-color, #6A6A6A);
        }
      }
    }

  }
`

interface ArticleTypeCardPropTypes {
    onActivateLoadingHandler: any,
    title: string,
    cardWidth: number,
    views: number,
    rating: number
    post: PostTypes,
    isAppleMobileDevice: boolean
}

const MobileArticleCard: FC<ArticleTypeCardPropTypes> =
    ({
         post,
         onActivateLoadingHandler,
         title,
         views,
         rating,
         isAppleMobileDevice,
         cardWidth
     }) => {

        const postUrl = `/post/${post?.postType}/${post._id}`;

        return (
            <MobileArticleCardStyledArticle className={'article-card card'} cardWidth={cardWidth}>
                <Link href={postUrl}>
                    <a rel={'next'} onClick={onActivateLoadingHandler} className={'mobile-article-card-link'}
                       title={title}>
                        <MobileArticleCardMedia post={post}
                                                mediaAlt={title}
                                                isAppleMobileDevice={isAppleMobileDevice}

                        />
                        <header className={'entry-header'}>
                            <span className={'card-header'}>{title}</span>
                        </header>

                        <div className={'article-card-under-media'}>
                            <div className={'mobile-article-card-under-media-info'}>
                                {views ?
                                    <CardViews views={views} className={'article-card-views article-card-info-data'}/>
                                    : null
                                }
                                {rating ? <CardRating rating={rating}
                                                      className={'article-card-rating article-card-info-data'}/>
                                    : null
                                }
                                {post?.updatedAt || post?.createdAt ?
                                    <CardLastUpdate targetedDate={post?.updatedAt || post?.createdAt}/>
                                    : null
                                }
                            </div>
                        </div>

                    </a>
                </Link>
            </MobileArticleCardStyledArticle>
        );
    };

export default MobileArticleCard;


// background-color: var(--post-element-background-color, #131314);
// width: ${({postsPerRawForMobile}: { postsPerRawForMobile: number }) => `calc(96vw / ${postsPerRawForMobile || 2})`};
// margin: 4px 2px ;
// font-size: 12px;
// max-width: 320px;
// max-height: 320px;