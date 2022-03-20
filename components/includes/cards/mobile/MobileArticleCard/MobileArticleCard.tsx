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
  width: ${({postsPerRawForMobile}: { postsPerRawForMobile: number }) => `calc(96vw / ${postsPerRawForMobile || 2})`};
  margin: 4px 2px ;
  font-size: 12px;
  max-width: 750px;
  
  .mobile-article-card-link {
    color: var(--post-element-text-color, #ccc);
    font-size: 12px;
    position: relative;
    max-width: 100%;
    margin-bottom: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    
    .mobile-article-card-title{
      font-size: 14px;
      font-weight: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 2px 0;
      width: 100%;
    }
    
    .article-card-under-media {
      width: calc(100% - 4px);
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .article-card-under-media-info {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin: 0;
        height: 20px;

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
      }
    }
    .last-update{
      width: calc(100% - 4px);
    }
    
  }
`

interface ArticleTypeCardPropTypes {
    onActivateLoadingHandler: any,
    title: string,
    views: number,
    rating: number
    post: PostTypes,
    postsPerRawForMobile: number,
}

const MobileArticleCard: FC<ArticleTypeCardPropTypes> =
    ({
         post,
         onActivateLoadingHandler,
         title,
         postsPerRawForMobile,
         views,
         rating
     }) => {

        const postUrl = `/post/${post?.postType}/${post._id}`;

        return (
            <MobileArticleCardStyledArticle className={'article-card'} postsPerRawForMobile={postsPerRawForMobile} >
                <Link href={postUrl}>
                    <a rel={'next'} onClick={onActivateLoadingHandler} className={'mobile-article-card-link'} title={title}>
                        <MobileArticleCardMedia post={post}
                                                mediaAlt={title}
                                                postsPerRawForMobile={postsPerRawForMobile}
                        />
                        <h3 className={'mobile-article-card-title'}>{title}</h3>
                        <div className={'article-card-under-media'}>
                            <div className={'article-card-under-media-info'}>
                                {views ? <CardViews views={views} className={'article-card-views article-card-info-data'}/>
                                    : null
                                }
                                {rating ? <CardRating rating={rating} className={'article-card-rating article-card-info-data'}/>
                                    : null
                                }
                            </div>
                        </div>
                        {post?.updatedAt ? <CardLastUpdate updatedAt={post?.updatedAt}/> : null}
                    </a>
                </Link>
            </MobileArticleCardStyledArticle>
        );
    };

export default MobileArticleCard;
