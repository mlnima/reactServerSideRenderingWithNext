import React, {FC} from "react";
import Link from "next/link";
import dynamic from 'next/dynamic'
import styled from "styled-components";
import ArticleCardMedia from "./ArticleCardMedia";
import ArticleTypeCardTitle from "./ArticleTypeCardTitle";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import CardMetaRenderer from "@components/includes/cards/asset/CardMetaData/CardMetaRenderer";

const CardLastUpdate = dynamic(() => import('../../asset/CardLastUpdate/CardLastUpdate'))
const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))


const ArticleCard = styled.div`
  background-color: var(--post-element-background-color, #131314);
  padding-bottom: 5px;
  width: ${(props: { cardWidth: number }) => `${props?.cardWidth}px`};
  max-width: 100%;
  margin: 7px;
  font-size: 14px;

  .article-card-link {
    position: relative;
    width: calc(100% - 4px);
    max-width: calc(100% - 4px);
    margin: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;

    .article-card-under-media {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: var(--post-element-info-text-color, #ccc);
      
      .article-card-under-media-info {
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
  .card-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .last-update {
      font-size: 9px;
      margin:  4px;
    }
  }

`

interface ArticleTypeCardPropTypes {
    post: PostTypes,
    cardWidth: number,
    onActivateLoadingHandler: any,
    title: string,
    postElementSize: string,
    views: number,
    rating: number ,
    index?:number
}

const ArticleTypeCard: FC<ArticleTypeCardPropTypes> =
    ({
         post,
         cardWidth,
         onActivateLoadingHandler,
         title,
         postElementSize,
         views,
         rating,
         index
     }) => {
        const postUrl = `/post/${post?.postType}/${post._id}`

        return (
            <ArticleCard className='article-card' cardWidth={cardWidth}>
                <Link href={`/post/${post?.postType}/${post._id}`}>
                    <a rel='next' onClick={onActivateLoadingHandler}
                       className='article-card-media-link'
                       title={title}
                    >
                        <ArticleCardMedia postElementSize={postElementSize}
                                          post={post}
                                          cardWidth={cardWidth}
                                          mediaAlt={title}
                                          index={index}
                        />
                    </a>
                </Link>
                <ArticleTypeCardTitle title={title}
                                      postUrl={postUrl}
                                      onActivateLoadingHandler={onActivateLoadingHandler}
                                      cardWidth={cardWidth}/>
                <Link href={postUrl}>
                    <a rel='next'
                       className='article-card-link'
                       title={title}
                       onClick={onActivateLoadingHandler}
                    >
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
                    </a>
                </Link>
                <div className={'card-info'}>
                    <CardMetaRenderer metas={[...post?.actors || [], ...post?.tags || [], ...post?.categories || []]}
                                      cardWidth={cardWidth}
                    />
                    {post?.updatedAt || post?.createdAt  ?
                        <CardLastUpdate targetedDate={post?.updatedAt|| post?.createdAt}/>
                        : null
                    }

                </div>
            </ArticleCard>

        );
    };

export default ArticleTypeCard;

// {post?.updatedAt || post?.createdAt  ?
//     <CardLastUpdate targetedDate={post?.updatedAt|| post?.createdAt}/>
//     : null
// }