import {FC} from "react";
import Link from "next/link";
import dynamic from 'next/dynamic'
import styled from "styled-components";
import {PostTypes} from "../../../../../_variables/TypeScriptTypes/PostTypes";
import MobileArticleCardMedia from "./MobileArticleCardMedia";

const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))
const CardLastUpdate = dynamic(() => import('../../asset/CardLastUpdate/CardLastUpdate'));

const MobileArticleCardStyledArticle = styled.article`
  width: ${({postsPerRawForMobile}: { postsPerRawForMobile: number }) => `calc(96vw / ${postsPerRawForMobile || 1})`};
  margin: 4px 2px ;
  font-size: 12px;

  .article-card-link {
    color: var(--post-element-text-color, #ccc);
    font-size: 12px;
    position: relative;
    width: calc(100% - 4px);
    max-width: calc(100% - 4px);
    margin: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    
    .mobile-article-card-title{
      font-size: 12px;
      font-weight: lighter;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 2px 0;
    }
    
    .article-card-under-media {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .article-card-under-media-info {
        font-size: 12px;
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
        const postUrl = `/post/${post.postType}/${post._id}`

        return (
            <MobileArticleCardStyledArticle className='article-card' postsPerRawForMobile={postsPerRawForMobile} >
                <Link href={postUrl}>
                    <a rel='next' onClick={onActivateLoadingHandler}
                       className='article-card-link'
                       title={title}
                    >
                        <MobileArticleCardMedia post={post}
                                                mediaAlt={title}
                                                views={views}
                                                rating={rating}
                                                postsPerRawForMobile={postsPerRawForMobile}
                        />
                        <h3 className={'mobile-article-card-title'}>{title}</h3>
                        <div className='article-card-under-media'>
                            <div className='article-card-under-media-info'>
                                {views ? <CardViews views={views}
                                                    className={'article-card-views article-card-info-data'
                                                    }/>
                                    : null
                                }
                                {rating ? <CardRating rating={rating}
                                                      className={'article-card-rating article-card-info-data'}
                                    />
                                    : null
                                }
                            </div>
                        </div>
                        {post?.updatedAt ?
                            <CardLastUpdate updatedAt={post?.updatedAt}/>
                            : null
                        }
                    </a>
                </Link>
            </MobileArticleCardStyledArticle>
        );
    };

export default MobileArticleCard;
