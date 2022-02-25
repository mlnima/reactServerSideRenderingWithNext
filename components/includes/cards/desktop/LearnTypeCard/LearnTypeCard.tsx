import {FC} from "react";
import Link from "next/link";
import styled from "styled-components";
import LearnTypeCardMedia from "./LearnTypeCardMedia";
import LearnTypeCardTitle from "./LearnTypeCardTitle";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import dynamic from "next/dynamic";

const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))
// width: ${(props: { cardWidth: number, postElementSize: string }) => props.postElementSize === 'list' ? '100%' : 'calc(50vw - 5.6px)'};
// max-width: ${(props: { cardWidth: number, postElementSize: string }) => props.postElementSize === 'list' ? `100%` : 'calc(50vw - 5.6px)'};
// width: ${(props: LearnTypeCardStyledDivPropType) => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
// max-width: ${(props: LearnTypeCardStyledDivPropType) => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
interface LearnTypeCardStyledDivPropType {
    postsPerRawForMobile: number,
    cardWidth: number,
    postElementSize: string
}

const LearnTypeCardStyledDiv = styled.div`
  background-color: var(--post-element-background-color, #131314);
  width: ${(props: LearnTypeCardStyledDivPropType) => props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
  flex-direction: ${(props: LearnTypeCardStyledDivPropType) => props.postElementSize === 'list' ? 'row' : 'column'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-bottom: 5px;
  margin: 7px;
  
  .learn-post-card-link {
    position: relative;
    width: 100%;
    flex-direction: ${(props: LearnTypeCardStyledDivPropType) => props.postElementSize === 'list' ? 'row' : 'column'};
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;

    .learn-post-card-under-media {
      
      width: calc(100% - 4px);
      height: ${(props: LearnTypeCardStyledDivPropType) => props.postElementSize === 'list' ? '65px' : 'auto'};

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: ${(props: LearnTypeCardStyledDivPropType) => props.postElementSize === 'list' ? 4 : 0}px;

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
    cardWidth: number,
    postElementSize: string,
    postsPerRawForMobile?: number,
    onActivateLoadingHandler: any,
    title: string,
    noImageUrl: string,
    views: number,
    rating: number,
    post: PostTypes,
}

const LearnTypeCard: FC<VideoTypeCardPropTypes> = (props) => {

    const postUrl = `/post/${props.post?.postType}/${props.post?._id}`
    const categoriesImages = props.post.categories.filter(category => category?.imageUrl).map(category => category?.imageUrl)

    return (
        <LearnTypeCardStyledDiv className='learn-post-card' postElementSize={props.postElementSize}
                                cardWidth={props.cardWidth} postsPerRawForMobile={props.postsPerRawForMobile}>
            <Link href={postUrl}>
                <a rel='next' onClick={props.onActivateLoadingHandler} className='learn-post-card-link'
                   title={props.title}>

                    <LearnTypeCardMedia
                        categoriesImages={categoriesImages}
                        noImageUrl={props.noImageUrl}
                        postElementSize={props.postElementSize}
                        post={props.post}
                        cardWidth={props.cardWidth}
                        mediaAlt={props.title}
                    />
                    <div className='learn-post-card-under-media'>
                        <LearnTypeCardTitle title={props.title}/>
                        <div className='learn-post-card-under-media-info'>
                            {props.views ? <CardViews views={props.views}
                                                      className={'learn-card-views learn-card-info-data'}/> : null}
                            {props.rating ? <CardRating rating={props.rating}
                                                        className={'learn-card-rating learn-card-info-data'}/> : null}
                        </div>
                    </div>
                </a>
            </Link>
        </LearnTypeCardStyledDiv>

    );
};
export default LearnTypeCard;


// @media only screen and (min-width: 768px) {
//
//
//   }
