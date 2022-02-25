import {FC, useState} from 'react';
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import MobileCardImageRenderer from "../../mobileAsset/MobileCardImageRenderer";

let MobileLearnCardMediaStyledDiv = styled.div`
  position: relative;
  width: 100%;
  
  .learn-card-views {
    bottom: 3px;
    right: 3px;
  }

  .learn-card-rating {
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

interface MobileLearnCardMediaPropTypes {
    post: PostTypes,
    mediaAlt: string,
    postsPerRawForMobile: number,
}

const MobileLearnCardMedia: FC<MobileLearnCardMediaPropTypes> =
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

            <MobileLearnCardMediaStyledDiv className={'mobile-learn-card-media'}>
                <MobileCardImageRenderer imageUrl={post.mainThumbnail}
                                         postsPerRawForMobile={postsPerRawForMobile}
                                         mediaAlt={mediaAlt}
                                         errorHandler={errorHandler}
                />

            </MobileLearnCardMediaStyledDiv>
        )

    };
export default MobileLearnCardMedia;

