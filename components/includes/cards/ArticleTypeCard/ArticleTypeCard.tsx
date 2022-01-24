import {FC} from "react";
import Link from "next/link";
import dynamic from 'next/dynamic'
import styled from "styled-components";
import ArticleCardMedia from "./ArticleCardMedia";
import ArticleTypeCardTitle from "./ArticleTypeCardTitle";
import {PostTypes} from "../../../../_variables/TypeScriptTypes/PostTypes";

const CardViews = dynamic(() => import('../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../asset/CardRating/CardRating'))


const ArticleCard = styled.div`
  width: calc(50vw - 5.6px);
  max-width: calc(50vw - 5.6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--post-element-background-color, #131314);
  margin: 2.8px;
  font-size: 12px;
  padding-bottom: 5px;

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

  @media only screen and (min-width: 768px) {
    width: ${(props: { cardWidth: number }) => `${props?.cardWidth}px`};
    max-width: 100%;
    flex-direction: column;
    margin: 7px;
    .article-card-link {
      flex-direction: column;
    }
  }
`

interface ArticleTypeCardPropTypes {
    post: PostTypes,
    cardWidth: number,
    onActivateLoadingHandler: any,
    title: string,
    postElementSize: string,
    noImageUrl: string,
    views: number,
    rating: number
}

const ArticleTypeCard: FC<ArticleTypeCardPropTypes> =
    ({
         post,
         cardWidth,
         onActivateLoadingHandler,
         title,
         postElementSize,
         noImageUrl,
         views,
         rating
     }) => {
        const postUrl = `/post/${post.postType}/${post._id}`

        return (
            <ArticleCard className='article-card' cardWidth={cardWidth}>
                <Link href={`/post/${post.postType}/${post._id}`}>
                    <a rel='next' onClick={onActivateLoadingHandler} className='article-card-link' title={title}>
                        <ArticleCardMedia noImageUrl={noImageUrl}
                                          postElementSize={postElementSize}
                                          post={post}
                                          cardWidth={cardWidth}
                                          mediaAlt={title}
                        />
                    </a>
                </Link>
                <ArticleTypeCardTitle title={post.title}
                                      postUrl={postUrl}
                                      onActivateLoadingHandler={onActivateLoadingHandler}
                                      cardWidth={cardWidth}
                                      tags={post?.tags}
                                      categories={post?.categories}/>
                <Link href={postUrl}>
                    <a rel='next' className='article-card-link' title={title} onClick={onActivateLoadingHandler}>
                        <div className='article-card-under-media'>
                            <div className='article-card-under-media-info'>
                                {views ? <CardViews views={views} className={'article-card-views article-card-info-data'}/> : null}
                                {rating ? <CardRating rating={rating} className={'article-card-rating article-card-info-data'}/> : null}
                            </div>
                        </div>
                    </a>
                </Link>
            </ArticleCard>

        );
    };

export default ArticleTypeCard;

