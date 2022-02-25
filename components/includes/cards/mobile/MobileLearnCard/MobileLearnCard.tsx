//MobileLearnCard
import {FC} from "react";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import styled from "styled-components";
import Link from "next/link";
import MobileCardImageRenderer from "./MobileLearnCardMedia";
import dynamic from "next/dynamic";

const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))
const CardLastUpdate = dynamic(() => import('../../asset/CardLastUpdate/CardLastUpdate'));
interface MobileLearnCardPropTypes {
    onActivateLoadingHandler: any,
    title: string,
    views: number,
    rating: number
    post: PostTypes,
    postsPerRawForMobile: number,
}



const MobileLearnCardStyledArticle = styled.article`
  background-color: var(--post-element-background-color, #131314);
  width: ${({postsPerRawForMobile}: { postsPerRawForMobile: number }) => `calc(96vw / ${postsPerRawForMobile || 2})`};
  margin: 4px 2px ;
  font-size: 12px;
  max-width: 750px;
  .mobile-learn-card-link {
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

    .mobile-learn-card-title{
      font-size: 14px;
      font-weight: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 2px 0;
      width: 100%;
    }

    .learn-card-under-media {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .learn-card-under-media-info {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin: 0;
        height: 20px;

        .learn-card-info-data {
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
      width: 100%;
    }

  }
`

const MobileLearnCard: FC<MobileLearnCardPropTypes> =
    ({
         post,
         onActivateLoadingHandler,
         title,
         postsPerRawForMobile,
         views,
         rating
     }) =>{
        const postUrl = `/post/${post.postType}/${post._id}`;
        return (
            <MobileLearnCardStyledArticle className={'learn-card'} postsPerRawForMobile={postsPerRawForMobile}>
                <Link href={postUrl}>
                    <a rel={'next'} onClick={onActivateLoadingHandler} className={'mobile-learn-card-link'} title={title}>
                        <MobileCardImageRenderer post={post}
                                                mediaAlt={title}
                                                postsPerRawForMobile={postsPerRawForMobile}
                        />
                        <h3 className={'mobile-learn-card-title'}>{title}</h3>
                        <div className={'learn-card-under-media'}>
                            <div className={'learn-card-under-media-info'}>
                                {views ? <CardViews views={views} className={'learn-card-views learn-card-info-data'}/>
                                    : null
                                }
                                {rating ? <CardRating rating={rating} className={'learn-card-rating learn-card-info-data'}/>
                                    : null
                                }
                            </div>
                        </div>
                        {post?.updatedAt ? <CardLastUpdate updatedAt={post?.updatedAt}/> : null}
                    </a>
                </Link>
            </MobileLearnCardStyledArticle>
        )
    };
export default MobileLearnCard
