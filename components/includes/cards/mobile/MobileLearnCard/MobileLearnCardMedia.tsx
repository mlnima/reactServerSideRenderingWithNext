import {FC} from 'react';
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

        return (

            <MobileLearnCardMediaStyledDiv className={'mobile-learn-card-media'}>
                <MobileCardImageRenderer imageUrl={post.mainThumbnail}
                                         postsPerRawForMobile={postsPerRawForMobile}
                                         mediaAlt={mediaAlt}
                />
            </MobileLearnCardMediaStyledDiv>
        )

    };
export default MobileLearnCardMedia;

