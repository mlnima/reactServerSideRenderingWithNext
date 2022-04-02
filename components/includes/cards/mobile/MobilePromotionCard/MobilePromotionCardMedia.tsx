import {FC} from 'react';
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
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

interface MobilePromotionCardMediaPropTypes {
    post: PostTypes,
    mediaAlt: string,
    postsPerRawForMobile: number,
    index: number,

}

const MobilePromotionCardMedia: FC<MobilePromotionCardMediaPropTypes> =
    ({
         post,
         mediaAlt,
         postsPerRawForMobile,
         index
     }) => {

        return (

            <MobilePromotionCardMediaStyledDiv className={'mobile-promotion-card-media'}>
                <MobileCardImageRenderer imageUrl={post.mainThumbnail}
                                         postsPerRawForMobile={postsPerRawForMobile}
                                         mediaAlt={mediaAlt}
                                         index={index}
                />
            </MobilePromotionCardMediaStyledDiv>
        )

    };
export default MobilePromotionCardMedia;

