import {FC, useState} from 'react';
import styled from "styled-components";
import {PostTypes} from "../../../../../_variables/TypeScriptTypes/PostTypes";
import MobileCardImageRenderer from "../../mobileAsset/MobileCardImageRenderer";
import CardViews from "../../asset/CardViews/CardViews";
import CardRating from "../../asset/CardRating/CardRating";

let MobileArticleCardMediaStyledDiv = styled.div`
  position: relative;

  //.article-card-image {
  //  width: 100%;
  //  height: calc(100% / 1.777);
  //  object-fit: contain;
  //}

  .article-card-views {
    bottom: 3px;
    right: 3px;
  }

  .article-card-rating {
    bottom: var(--video-card-info-distance, 2px);
    left: var(--video-card-info-distance, 2px);
  }
`

const NoImageStyleDiv = styled.div`
  width: 100%;
  height: calc(100% / 1.777);
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: var(--post-element-info-text-color, #ccc);
  }
`

interface MobileArticleCardMediaPropTypes {
    post: PostTypes,
    mediaAlt: string,
    views: number,
    rating: number,
    postsPerRawForMobile: number,
}

const MobileArticleCardMedia: FC<MobileArticleCardMediaPropTypes> =
    ({
         post,
         mediaAlt,
         views,
         rating,
         postsPerRawForMobile,
     }) => {

        const [gotError, setGotError] = useState(false)

        const errorHandler = () => {
            !gotError ? setGotError(true) : null
        }

        if (!post.mainThumbnail || gotError) {
            return (
                <NoImageStyleDiv className='no-image'>
                    <span className={'no-image-alt'}>{mediaAlt || 'NO IMAGE'}</span>
                </NoImageStyleDiv>
            )
        } else return (

            <MobileArticleCardMediaStyledDiv className={'mobile-article-card-media'}>
                <MobileCardImageRenderer imageUrl={post.mainThumbnail}
                                         postsPerRawForMobile={postsPerRawForMobile}
                                         mediaAlt={mediaAlt}
                                         errorHandler={errorHandler}
                />

            </MobileArticleCardMediaStyledDiv>
        )

    };
export default MobileArticleCardMedia;

