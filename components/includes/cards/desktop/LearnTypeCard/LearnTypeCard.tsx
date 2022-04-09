import {FC} from "react";
import Link from "next/link";
import styled from "styled-components";
import LearnTypeCardMedia from "./LearnTypeCardMedia";
import LearnTypeCardTitle from "./LearnTypeCardTitle";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import dynamic from "next/dynamic";
const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))

const LearnTypeCardStyledDiv = styled.div`
  background-color: var(--post-element-background-color, #131314);
  width: 100%;
  font-size: 14px;
  
  .learn-post-card-link {
    position: relative;
    display: block;
    
    .learn-post-card-under-media {
      position: relative;
      
      .learn-post-card-under-media-info {
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
  }
`

interface VideoTypeCardPropTypes {
    onActivateLoadingHandler: any,
    title: string,
    views: number,
    rating: number,
    post: PostTypes,
    index?:number
}

const LearnTypeCard: FC<VideoTypeCardPropTypes> = 
    ({
         title,
         views,
         rating,
         post,
         index,
         onActivateLoadingHandler,
     }) => {

    const postUrl = `/post/${post?.postType}/${post?._id}`
    const categoriesImages = post?.categories?.filter(category => category?.imageUrl).map(category => category?.imageUrl)

    return (
        <LearnTypeCardStyledDiv className='learn-post-card'>
            <Link href={postUrl}>
                <a rel='next' onClick={onActivateLoadingHandler} className='learn-post-card-link'
                   title={title}>

                    <LearnTypeCardMedia
                        categoriesImages={categoriesImages}
                        post={post}
                        mediaAlt={title}
                        index={index}
                    />
                    <div className='learn-post-card-under-media'>
                        <LearnTypeCardTitle title={title}/>
                        <div className='learn-post-card-under-media-info'>
                            {views ? <CardViews views={views}
                                                      className={'learn-card-views learn-card-info-data'}/> : null}
                            {rating ? <CardRating rating={rating}
                                                        className={'learn-card-rating learn-card-info-data'}/> : null}
                        </div>
                    </div>
                </a>
            </Link>
        </LearnTypeCardStyledDiv>

    );
};
export default LearnTypeCard;


