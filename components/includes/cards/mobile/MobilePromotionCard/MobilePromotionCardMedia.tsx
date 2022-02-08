import {FC, useState} from 'react';
import styled from "styled-components";
import {PostTypes} from "../../../../../_variables/TypeScriptTypes/PostTypes";
import MobileCardImageRenderer from "../../mobileAsset/MobileCardImageRenderer";

let MobilePromotionCardMediaStyledDiv = styled.div`
  position: relative;
  
  .promotion-card-views {
    bottom: 3px;
    right: 3px;
  }

  .promotion-card-rating {
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

interface MobilePromotionCardMediaPropTypes {
    post: PostTypes,
    mediaAlt: string,
    postsPerRawForMobile: number,
}

const MobilePromotionCardMedia: FC<MobilePromotionCardMediaPropTypes> =
    ({
         post,
         mediaAlt,
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

            <MobilePromotionCardMediaStyledDiv className={'mobile-promotion-card-media'}>
                <MobileCardImageRenderer imageUrl={post.mainThumbnail}
                                         postsPerRawForMobile={postsPerRawForMobile}
                                         mediaAlt={mediaAlt}
                                         errorHandler={errorHandler}
                />

            </MobilePromotionCardMediaStyledDiv>
        )

    };
export default MobilePromotionCardMedia;

