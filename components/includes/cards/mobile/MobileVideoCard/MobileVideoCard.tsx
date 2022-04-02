import {FC} from "react";
import Link from "next/link";
import styled from "styled-components";
import dynamic from "next/dynamic";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import MobileVideoCardMedia from "./MobileVideoCardMedia/MobileVideoCardMedia";

const CardLastUpdate = dynamic(() => import('../../asset/CardLastUpdate/CardLastUpdate'));
const CardViews = dynamic(() => import('@components/includes/cards/asset/CardViews/CardViews'));
const CardRating = dynamic(() => import('@components/includes/cards/asset/CardRating/CardRating'));

const MobileVideoCardStyledArticle = styled.article`
  background-color: var(--post-element-background-color, #131314);
  width: ${({postsPerRawForMobile}: { postsPerRawForMobile: number }) => `calc(96vw / ${postsPerRawForMobile || 1})`};
  margin: 4px 2px ;
 // max-width: 320px;

  .mobile-video-card-media-link {
    color: var(--post-element-text-color, #ccc);
    position: relative;
    display: block;
    cursor: pointer;

    .entry-header{
      font-weight: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 14px;
      .card-header {
        margin: 2px 0;
      }
    }


    .views-rating{
      font-size: 12px;
      height: 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .video-card-views,.video-card-rating {
        color: var(--post-element-info-text-color, #939393);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

    }
    .last-update{
      
      font-size: 9px;
      margin:  4px;
      color: var( --post-element-info-text-color,#939393);
    }
  }
`

interface MobileVideoCardPropTypes {
    onActivateLoadingHandler: any,
    title: string,
    views: number,
    rating: number,
    post: PostTypes,
    postsPerRawForMobile: number,
    index?:number
}

const MobileVideoCard: FC<MobileVideoCardPropTypes> =
    ({
         post,
         onActivateLoadingHandler,
         title,
         views,
         postsPerRawForMobile,
         rating,
         index,

     }) => {

        const postUrl = `/post/${post?.postType}/${post._id}`;

        return (
            <MobileVideoCardStyledArticle postsPerRawForMobile={postsPerRawForMobile}>
                <Link href={postUrl}>
                    <a rel={'next'}
                       className={'mobile-video-card-media-link'}
                       title={title}
                       onClick={onActivateLoadingHandler}
                    >

                        <MobileVideoCardMedia post={post}
                                              mediaAlt={title}
                                              duration={post.duration}
                                              quality={post.quality}
                                              postsPerRawForMobile={postsPerRawForMobile}
                                              index={index}
                        />

                        <header className={'entry-header'} >
                            <span className={'card-header'}>{title}</span>
                        </header>


                        {post.views || rating ?
                        <div className={'views-rating'}>
                        {views ?   <CardViews views={views} className={'video-card-views video-card-info-data'}/> :null }
                        {rating ?  <CardRating rating={rating} className={'video-card-rating video-card-info-data'}/> :null }
                        </div>
                            :null
                        }
                        {post?.updatedAt || post?.createdAt  ?
                            <CardLastUpdate targetedDate={post?.updatedAt|| post?.createdAt}/>
                            : null
                        }

                    </a>
                </Link>
            </MobileVideoCardStyledArticle>
        )
    };
export default MobileVideoCard
