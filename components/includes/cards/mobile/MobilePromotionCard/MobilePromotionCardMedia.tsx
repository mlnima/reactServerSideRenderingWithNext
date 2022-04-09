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
    index: number,
    isAppleMobileDevice:boolean
}

const MobilePromotionCardMedia: FC<MobilePromotionCardMediaPropTypes> =
    ({
         post,
         mediaAlt,
         index,
         isAppleMobileDevice
    }) => {

        return (
            <MobilePromotionCardMediaStyledDiv className={'mobile-promotion-card-media'}>
                <MobileCardImageRenderer imageUrl={post.mainThumbnail}
                                         mediaAlt={mediaAlt}
                                         index={index}
                                         isAppleMobileDevice={isAppleMobileDevice}
                />
            </MobilePromotionCardMediaStyledDiv>
        )

    };

export default MobilePromotionCardMedia;

